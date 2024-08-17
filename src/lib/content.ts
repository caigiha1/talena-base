const content = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "It is required field",
      },
    ],
  },
];

export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "introductionComponent",
      content,
    },
    {
      type: "responseComponent",
      content,
    },
    {
      type: "requireComponent",
      content,
    },
    {
      type: "benefitComponent",
      content,
    },
  ],
};
