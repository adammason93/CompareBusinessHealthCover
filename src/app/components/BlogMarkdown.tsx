import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-3 scroll-mt-24">{children}</h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-24">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2 scroll-mt-24">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-gray-900 mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 my-4 space-y-2 text-gray-700 marker:text-brand-navy">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 my-4 space-y-2 text-gray-700 marker:font-medium">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-teal bg-brand-teal/10 pl-4 py-1 my-4 text-gray-700 rounded-r">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-brand-navy underline underline-offset-2 hover:text-teal-900 font-medium"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
  img: ({ src, alt }) => {
    if (!src) return null;
    return (
      <span className="block my-6 not-prose">
        <ImageWithFallback
          src={src}
          alt={alt ?? ""}
          className="w-full max-h-[28rem] object-contain rounded-lg border border-gray-100 bg-gray-50"
          loading="lazy"
        />
      </span>
    );
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 not-prose rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-100 text-gray-900">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
  tr: ({ children }) => <tr className="even:bg-gray-50/80">{children}</tr>,
  th: ({ children }) => (
    <th className="border-b border-gray-200 px-3 py-2.5 text-left font-semibold whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-gray-100 px-3 py-2.5 text-gray-800 align-top">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#1e1e2e] text-gray-100 rounded-lg p-4 overflow-x-auto text-sm my-6 not-prose border border-gray-700">
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) {
      return (
        <code className={`${className ?? ""} text-[13px] leading-relaxed`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-gray-100 text-gray-900 px-1.5 py-0.5 rounded text-[0.9em] font-mono border border-gray-200"
        {...props}
      >
        {children}
      </code>
    );
  },
};

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="blog-md max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

/** Strip markdown for meta descriptions / previews (best-effort). */
export function plainTextFromMarkdown(md: string, maxLen: number): string {
  let s = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[|>#*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1))}…`;
}
