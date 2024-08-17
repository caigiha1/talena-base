import { ControlledBubbleMenu } from "./titap-controlled-bubble-menu";
import { tiptapExtensions } from "@/components/tiptap/tiptap-extensions.ts";
import MenuBar from "@/components/tiptap/tiptap-menubar.tsx";
import { TiptapRewriteMenu } from "@/components/tiptap/tiptap-rewrite-menu.tsx";
import { cn } from "@/lib/utils.ts";
import { setText } from "@/redux/slices/jd-manager-slice.ts";
import { useAppDispatch } from "@/redux/store.ts";
import { GeneratedJDType } from "@/type";
import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { defaultEditorContent } from "@/lib/content.ts";

export type TiptapMethods = {
  clearContent: () => void;
};

export const TipTap = forwardRef(
  (
    props: {
      isPending: boolean;
      isPendingUpdate?: boolean;
      dataGenerated: Content | undefined;
    },
    ref: React.ForwardedRef<TiptapMethods>,
  ) => {
    const dispatch = useAppDispatch();
    const editor = useEditor({
      extensions: tiptapExtensions,
      onUpdate: ({ editor }) => {
        dispatch(setText(editor.view.dom.innerHTML));
      },
      editorProps: {
        attributes: {
          class: cn(
            "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc text-sm",
          ),
        },
      },
      content: defaultEditorContent,
    });

    useLayoutEffect(() => {
      if (props.dataGenerated === undefined) return;
      const transformContent = (content: GeneratedJDType) => {
        if (content) {
          return {
            type: "doc",
            content: [
              {
                type: "introductionComponent",
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        type: "text",
                        text: content.introduction,
                      },
                    ],
                  },
                ],
              },
              {
                type: "responseComponent",
                content: [
                  {
                    type: "bulletList",
                    content: content.responsibilities.map((item) => ({
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: item,
                            },
                          ],
                        },
                      ],
                    })),
                  },
                ],
              },
              {
                type: "requireComponent",
                content: [
                  {
                    type: "bulletList",
                    content: content.requirements.map((item) => ({
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: item,
                            },
                          ],
                        },
                      ],
                    })),
                  },
                ],
              },
              {
                type: "benefitComponent",
                content: [
                  {
                    type: "bulletList",
                    content: content.benefits.map((item) => ({
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              text: item,
                            },
                          ],
                        },
                      ],
                    })),
                  },
                ],
              },
            ],
          };
        }
      };

      const transformedContent = transformContent(
        props.dataGenerated as unknown as GeneratedJDType,
      );

      setTimeout(() => {
        editor?.commands.setContent(transformedContent as unknown as Content);
        dispatch(setText(editor?.view.dom.innerHTML as string));
      });
    }, [props.dataGenerated, editor, dispatch]);

    const editorRef: React.MutableRefObject<Editor | null> = useRef(null);
    useImperativeHandle(ref, () => ({
      clearContent: () => {
        editorRef.current?.commands.clearContent();
      },
    }));

    if (!editor) return null;
    editorRef.current = editor;
    const slice = editor.state.selection.content();
    const text2 = editor.storage.markdown.serializer.serialize(slice.content);

    function convertHtmlToString(html: string) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const listItems = doc.querySelectorAll("li");
      listItems.forEach((li) => {
        const textContent = (li.textContent as any).trim();
        const newTextNode = doc.createTextNode(`- ${textContent}\n`);
        (li.parentNode as any).replaceChild(newTextNode, li);
      });

      return (doc.body.textContent as any).trim();
    }

    const convertedString = convertHtmlToString(text2);

    return (
      <div className="editor">
        <MenuBar
          editor={editor}
          isPending={props.isPending}
          isPendingUpdate={props.isPendingUpdate}
        />
        <EditorContent editor={editor} />
        {editor && (
          <ControlledBubbleMenu
            open={!editor.view.state.selection.empty}
            editor={editor}
          >
            <TiptapRewriteMenu editor={editor} text={convertedString} />
          </ControlledBubbleMenu>
        )}
      </div>
    );
  },
);
