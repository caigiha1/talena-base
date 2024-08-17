import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export function BenefitsComponent() {
  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false}>Benefits</label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
}
