import type { MDXComponents } from 'mdx/types'
import Section from '@/components/Section'
import Callout from '@/components/Callout'
import Defn from '@/components/Defn'
import Example from '@/components/Example'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Section-level semantic elements
    h3: ({ children, ...props }) => (
      <h3
        className="font-sans text-[14px] font-semibold tracking-[0.08em] uppercase text-ink mt-7 mb-[10px] first:mt-0"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="m-0 mb-[14px]" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="pl-[22px] m-0 mb-[14px]" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="pl-[22px] m-0 mb-[14px]" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="my-1 marker:text-ink-mute" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-ink" {...props}>
        {children}
      </strong>
    ),
    code: ({ children, ...props }) => (
      <code
        className="font-mono text-[0.88em] bg-bg-soft px-[5px] py-[1px] rounded border border-line-soft"
        {...props}
      >
        {children}
      </code>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-[14px]">
        <table className="w-full border-collapse text-[14px]" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-[14px] py-[10px] text-left font-semibold text-ink text-[12px] uppercase tracking-[0.06em] bg-bg-soft border-b border-line"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-[14px] py-[10px] text-left border-b border-line-soft align-top last:[&~td]:border-b-0"
        {...props}
      >
        {children}
      </td>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-[3px] border-l-accent bg-accent-soft px-[18px] py-[14px] my-[18px] rounded-r-[6px] text-[14.5px] not-italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Custom components available in all MDX files
    Section,
    Callout,
    Defn,
    Example,
    ...components,
  }
}
