import React, { useContext, useEffect, useMemo } from "react";

import { IProps } from "../../Editor";
import { EditorContext } from "../../Context";

import { unified } from "unified";
// eslint-disable-next-line
//@ts-ignore
import rehypePrism from "rehype-prism-plus";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

import { useVirtualizer } from "@tanstack/react-virtual";

function html2Escape(sHtml: string) {
  return sHtml.replace(
    /[<&"]/g,
    (c: string) =>
      ((
        { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" } as Record<
          string,
          string
        >
      )[c])
  );
}

export interface MarkdownProps
  extends IProps,
    React.HTMLAttributes<HTMLPreElement> {}

export default function Markdown(props: MarkdownProps) {
  const { prefixCls } = props;
  const {
    markdown = "",
    highlightEnable,
    dispatch,
  } = useContext(EditorContext);

  // const preRef = React.createRef<HTMLPreElement>();

  // useEffect(() => {
  //   if (preRef.current && dispatch) {
  //     dispatch({ textareaPre: preRef.current });
  //   }
  // }, []);

  const mdCodeBlocks = useMemo(() => {
    let mdStr = `<pre class="language-markdown ${prefixCls}-text-pre wmde-markdown-color"><code class="language-markdown">${html2Escape(
      String.raw`${markdown}`
    )}\n</code></pre>`;

    const parsedMd = unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypePrism, { ignoreMissing: true, tailwind: true })
      .use(rehypeStringify)
      .processSync(mdStr)
      .toString();

    const lines = parsedMd
      .replace("</code></pre>", "")
      .split('<span class="code-line">');

    const formattedLines = lines
      .filter((line) => line.endsWith("</span>"))
      .map((line) => {
        const lastSpan = line.lastIndexOf("</span>");
        return line.substring(0, lastSpan);
      });

    return formattedLines;
  }, [markdown, highlightEnable, prefixCls]);

  const virtualizer = useVirtualizer({
    count: mdCodeBlocks.length,
    getScrollElement: () => document.getElementById("wrapper"),
    estimateSize: () => 30,
  });

  return (
    <div className="wmde-markdown-color-wrapper">
      <pre
        className={`language-markdown w-md-editor-text-pre wmde-markdown-color language-markdown`}
      >
        <code
          className="language-markdown code-highlight"
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const index = virtualRow.index;
            const line = mdCodeBlocks[index];

            return (
              <span
                key={virtualRow.key}
                data-index={index}
                ref={virtualizer.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  lineHeight: "17.9px",
                }}
                className="code-line absolute left-0 top-0 bg-red-500"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            );
          })}
        </code>

        {/* <code
          className="language-markdown code-highlight"
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {mdCodeBlocks.map((line, index) => (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: line }}
              className="code-line bg-red-500"
            />
          ))}
        </code> */}
      </pre>
    </div>
  );
}
