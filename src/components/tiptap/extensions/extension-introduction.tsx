import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Introduction } from "./introduction-component.tsx";

export default Node.create({
  name: "introductionComponent",

  group: "block",

  content: "paragraph+",

  parseHTML() {
    return [
      {
        tag: "introduction-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["introduction-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Introduction);
  },
});
