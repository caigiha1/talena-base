import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

export function Introduction() {
  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false} aria-disabled={true}>
        Introduction
      </label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
}
