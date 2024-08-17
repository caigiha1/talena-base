import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import IntroductionComponent from "./extensions/extension-introduction.tsx";
import ResponseComponent from "./extensions/extension-responsibilities.tsx";
import RequireComponent from "./extensions/extension-requirements.tsx";
import BenefitComponent from "./extensions/extension-benefits.tsx";
import { Markdown } from "tiptap-markdown";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { TypeSuggestion } from "./block-type-suggestion.tsx";

export const tiptapExtensions = [
  StarterKit,
  Underline,
  Markdown.configure({
    html: true, // Allow HTML input/output
    tightLists: true, // No <p> inside <li> in markdown output
    tightListClass: "tight", // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: "-", // <li> prefix in markdown output
    linkify: false, // Create links from "https://..." text
    breaks: false, // New lines (\n) in markdown input are converted to <br>
    transformPastedText: true, // Allow to paste markdown text in the editor
    transformCopiedText: true, // Copied text is transformed to markdown
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      // Custom placeholders based on node type
      switch (node.type.name) {
        case "introductionComponent":
          return "What’s the title?";
        case "responseComponent":
          return "Can you provide the response?";
        case "requireComponent":
          return "What are the requirements?";
        case "benefitComponent":
          return "List the benefits here.";
        default:
          return "Can you add some further context?";
      }
    },
    showOnlyCurrent: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
  }),
  TypeSuggestion, //  Open when have requirement
  IntroductionComponent,
  ResponseComponent,
  RequireComponent,
  BenefitComponent,
];
