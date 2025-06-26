import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "github-dark", // Możesz zmienić motyw na inny, np. 'one-dark-pro', 'poimandres'
      onVisitLine(node) {
        // Zapobiega zwijaniu się pustych linii, co psuje kopiowanie
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      onVisitHighlightedLine(node) {
        // Dodaje klasę do podświetlonej linii, jeśli użyjesz tej funkcji w markdown
        node.properties.className.push("line--highlighted");
      },
      onVisitHighlightedWord(node) {
        // Dodaje klasę do podświetlonego słowa
        node.properties.className = ["word--highlighted"];
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
