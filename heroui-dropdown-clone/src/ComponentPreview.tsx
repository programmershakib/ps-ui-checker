import type {ReactNode} from "react";

import {useState} from "react";

interface ComponentPreviewProps {
  /** Demo id, same as the docs (`dropdown-default`, `dropdown-with-icons`, …) */
  name: string;
  /** Raw demo source, shown in the collapsible code section */
  code: string;
  children: ReactNode;
  description?: string;
}

/**
 * Replica of the docs `<ComponentPreview>` block
 * (apps/docs/src/components/component-preview-container.tsx):
 * a bordered preview area on top, a collapsible source panel below.
 */
export function ComponentPreview({name, code, children, description}: ComponentPreviewProps) {
  const [expanded, setExpanded] = useState(false);
  const lines = code.replace(/\n+$/, "").split("\n");
  const shown = expanded ? lines : lines.slice(0, 5);

  return (
    <div className="component-preview-container" data-name={name}>
      {description ? <p className="docs-p">{description}</p> : null}

      {/* Preview section */}
      <div className="preview" data-name={name}>
        <div>{children}</div>
      </div>

      {/* Code section */}
      <div className="code-section">
        <div className="code-block-wrapper">
          <pre>
            <code>{shown.join("\n")}</code>
          </pre>
          <div style={{display: "flex", justifyContent: "flex-end", padding: "0 12px 10px"}}>
            <button
              className="docs-topbar__toggle"
              onClick={() => setExpanded((v) => !v)}
              type="button"
            >
              {expanded ? "Collapse code" : "Expand code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
}

/** Standalone fence, like the Anatomy / Global CSS / Examples blocks in the docs. */
export function CodeBlock({code}: CodeBlockProps) {
  return (
    <div className="docs-code">
      <pre>
        <code>{code.replace(/\n+$/, "")}</code>
      </pre>
    </div>
  );
}

interface ApiTableProps {
  head?: [string, string, string, string];
  rows: [ReactNode, ReactNode, ReactNode, ReactNode][];
}

export function ApiTable({
  head = ["Prop", "Type", "Default", "Description"],
  rows,
}: ApiTableProps) {
  return (
    <div className="docs-table-wrap">
      <table className="docs-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
