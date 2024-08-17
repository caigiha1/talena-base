import { Icons } from "@/common/Icon.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Editor } from "@tiptap/react";
import { Bold as BoldIcon, ListOrdered, Strikethrough } from "lucide-react";
import ItalicIcon from "remixicon-react/ItalicIcon";
import ListUnorderedIcon from "remixicon-react/ListUnorderedIcon";
import UnderlineIcon from "remixicon-react/UnderlineIcon";

interface MenuBarProps {
  editor: Editor | null;
  isPending: boolean;
  isPendingUpdate?: boolean;
}

const MenuBar = ({ editor, isPending, isPendingUpdate }: MenuBarProps) => {
  if (editor == null) {
    return null;
  }
  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  if (!editor) {
    return null;
  }

  return (
    <ToggleGroup type="multiple" className="border-b-[1px]">
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <BoldIcon className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <ItalicIcon className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="underline"
        aria-label="Toggle underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "is-active" : ""}
      >
        <UnderlineIcon className="w-5 h-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strike"
        aria-label="Toggle strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough className="w-5 h-5" />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="orderedList"
        aria-label="Toggle orderedList"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bulletList"
        aria-label="Toggle bulletList"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <ListUnorderedIcon className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="link"
        aria-label="Toggle link"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <Icons.LinkIcon />
      </ToggleGroupItem>
      <div className="flex justify-center items-center ml-auto">
        <Button
          variant="outline"
          className="flex gap-2 border-[1px] rounded-lg border-primary-500 h-7"
          type="submit"
          disabled={isPending || isPendingUpdate}
        >
          {isPending || isPendingUpdate ? (
            <Icons.Spinner className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.ManyStarIcon />
          )}

          <p className="text-primary-500">Generate with AI</p>
        </Button>
      </div>
    </ToggleGroup>
  );
};

export default MenuBar;
