import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Responsibilities } from "./responsibilities-component";

export default Node.create({
  name: "responseComponent",

  group: "block",

  content: "(paragraph|list?)+",

  parseHTML() {
    return [
      {
        tag: "response-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["response-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Responsibilities);
  },
});
