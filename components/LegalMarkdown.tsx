import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; depth: number; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "hr" }
  | { type: "table"; headers: string[]; rows: string[][] };

export function legalHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function legalTableOfContents(markdown: string) {
  return parseMarkdown(markdown)
    .filter((block): block is Extract<MarkdownBlock, { type: "heading" }> => block.type === "heading" && block.depth === 2)
    .map((block) => ({ id: block.id ?? legalHeadingId(block.text), label: block.text }));
}

export function LegalMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <article className="legal-panel legal-document-content space-y-6 text-[15px] leading-7 text-navy/85">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.depth === 1) return null;
          const HeadingTag = block.depth === 2 ? "h2" : block.depth === 3 ? "h3" : "h4";
          const classes =
            block.depth === 2
              ? "scroll-mt-28 pt-2 text-[24px] leading-[1.18] text-navy sm:text-[28px]"
              : "scroll-mt-28 pt-1 text-[18px] font-semibold leading-[1.25] text-navy";
          return (
            <HeadingTag key={`${block.text}-${index}`} id={block.id} className={classes}>
              {renderInline(block.text)}
            </HeadingTag>
          );
        }
        if (block.type === "hr") {
          return <hr key={`hr-${index}`} className="border-navy/12" />;
        }
        if (block.type === "table") {
          return (
            <div key={`table-${index}`} className="overflow-x-auto rounded-md border border-navy/12 bg-white/80">
              <table className="min-w-[720px] w-full border-collapse text-left text-[13.5px] leading-6">
                <thead className="bg-ocean/6 text-navy">
                  <tr>
                    {block.headers.map((cell) => (
                      <th key={cell} scope="col" className="border-b border-navy/12 px-4 py-3 font-semibold">
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className="border-b border-navy/8 last:border-b-0">
                      {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`} className="align-top px-4 py-3 text-structural">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={`p-${index}`} className="text-[15px] leading-7">
            {renderInline(block.text)}
          </p>
        );
      })}
    </article>
  );
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph();
      blocks.push({ type: "hr" });
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      const text = heading[2].trim();
      blocks.push({ type: "heading", depth: heading[1].length, text, id: legalHeadingId(text) });
      continue;
    }

    if (isTableStart(lines, index)) {
      flushParagraph();
      const headers = splitTableRow(lines[index]);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index]?.trim().startsWith("|")) {
        rows.push(splitTableRow(lines[index] ?? ""));
        index += 1;
      }
      index -= 1;
      blocks.push({ type: "table", headers, rows });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

function isTableStart(lines: string[], index: number): boolean {
  const current = lines[index]?.trim() ?? "";
  const next = lines[index + 1]?.trim() ?? "";
  return current.startsWith("|") && next.startsWith("|") && /^\|?[\s:-|]+\|?$/.test(next);
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|https?:\/\/[^\s|]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-navy">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(
        <a key={`${token}-${match.index}`} href={token} className="font-medium text-ocean underline underline-offset-2">
          {token}
        </a>
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}
