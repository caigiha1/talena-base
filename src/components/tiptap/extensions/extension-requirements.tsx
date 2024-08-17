import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { RequireComponent } from "./require-component";

export default Node.create({
  name: "requireComponent",

  group: "block",

  content: "(paragraph|list?)+",

  parseHTML() {
    return [
      {
        tag: "require-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["require-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RequireComponent);
  },
});
