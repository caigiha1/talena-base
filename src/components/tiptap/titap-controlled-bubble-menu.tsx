import { Editor, getMarkRange } from "@tiptap/react";
import { ReactNode, useLayoutEffect } from "react";
import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

type Props = {
  editor: Editor;
  open: boolean;
  children: ReactNode;
};

export const ControlledBubbleMenu = ({ editor, open, children }: Props) => {
  const { view } = editor;
  const {
    x,
    y,
    strategy: position,
    refs,
  } = useFloating({
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [
      offset({ mainAxis: 8 }),
      flip({
        padding: 8,
        boundary: editor.options.element,
        fallbackPlacements: [
          "bottom",
          "top-start",
          "bottom-start",
          "top-end",
          "bottom-end",
        ],
      }),
    ],
  });

  useLayoutEffect(() => {
    refs.setReference({
      getBoundingClientRect() {
        const { ranges } = editor.state.selection;
        const from = Math.min(...ranges.map((range) => range.$from.pos));
        const to = Math.max(...ranges.map((range) => range.$to.pos));

        // If the selection is a node selection, return the node's bounding rect
        if (isNodeSelection(editor.state.selection)) {
          const node = editor.view.nodeDOM(from) as HTMLElement;

          if (node) {
            return node.getBoundingClientRect();
          }
        }

        // If the clicked position a mark, create a selection from the mark range
        // When the selection is not empy, the bubble menu will be shown
        const range = getMarkRange(
          view.state.doc.resolve(from),
          view.state.schema.marks.link,
        );
        if (range) {
          const $start = view.state.doc.resolve(range.from);
          const $end = view.state.doc.resolve(range.to);
          const transaction = view.state.tr.setSelection(
            new TextSelection($start, $end),
          );
          view.dispatch(transaction);
          return posToDOMRect(editor.view, range.from, range.to);
        }

        // Otherwise,
        return posToDOMRect(editor.view, from, to);
      },
    });
  }, [refs.reference, editor.state.selection, view]);

  if (!open) {
    return null;
  }
  const style = { position, top: y ?? 0, left: x ?? 0 };

  return (
    <div ref={refs.setFloating} style={style} className="bubble-menu">
      {children}
    </div>
  );
};
