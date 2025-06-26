import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkBreaks from "remark-breaks"; // <-- 1. Import nowej wtyczki
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkBreaks) // <-- 2. Użycie wtyczki do "enterów"
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      onVisitLine(node) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      onVisitHighlightedLine(node) {
        node.properties.className.push("line--highlighted");
      },
      onVisitHighlightedWord(node) {
        node.properties.className = ["word--highlighted"];
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
