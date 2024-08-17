import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BenefitsComponent } from "./benefits-component.tsx";

export default Node.create({
  name: "benefitComponent",

  group: "block",

  content: "(paragraph|list?)+",

  parseHTML() {
    return [
      {
        tag: "benefit-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["benefit-component", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BenefitsComponent);
  },
});
