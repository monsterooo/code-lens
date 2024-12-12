import Markdown from "react-markdown";

export function MarkdownContent({ content }: { content: string }) {
  return <Markdown>{content}</Markdown>;
}
