import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export function Responsibilities() {
  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false}>Responsibilities</label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
}
