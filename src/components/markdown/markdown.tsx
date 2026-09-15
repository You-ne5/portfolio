import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveMdAsset } from "@/lib/projects";

export function ProjectMarkdown({ source, slug }: { source: string; slug: string }) {
  const components: Components = {
    h1: ({ children }) => <h2 className="mt-12 font-display text-4xl leading-none first:mt-0">{children}</h2>,
    h2: ({ children }) => <h2 className="mt-12 font-display text-4xl leading-none first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-display text-3xl leading-none">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 text-lg font-semibold">{children}</h4>,
    p: ({ children }) => <p className="mt-4 leading-7 text-muted">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted marker:text-accent">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted marker:text-accent">{children}</ol>,
    li: ({ children }) => <li className="pl-1 leading-7">{children}</li>,
    a: ({ href = "", children }) => {
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-accent underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-fg">{children}</strong>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-accent pl-4 italic [&>p]:mt-2">{children}</blockquote>
    ),
    hr: () => <hr className="my-10 border-line" />,
    code: ({ children }) => (
      <code className="rounded-[4px] bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-fg">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto rounded-card border border-line bg-surface p-4 text-sm [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => <th className="border-b border-line px-3 py-2 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-line px-3 py-2 text-muted">{children}</td>,
    img: ({ src, alt }) =>
      typeof src === "string" ? (
        // eslint-disable-next-line @next/next/no-img-element -- markdown images have unknown dimensions
        <img
          src={resolveMdAsset(slug, src)}
          alt={alt ?? ""}
          loading="lazy"
          className="mt-6 block w-full rounded-card border border-line"
        />
      ) : null,
  };

  return (
    <Markdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
      {source}
    </Markdown>
  );
}
