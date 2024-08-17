import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export function RequireComponent() {
  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false}>Requirements</label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
}
