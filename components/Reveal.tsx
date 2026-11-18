import { Children, type ReactNode } from "react";

/** Static editorial reveal surface; content is visible without client hydration.
 * Decorative motion and functional tour/gallery transitions live in their own components.
 */
export function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = as;
  return (
    <Tag className={`${className} reveal reveal--shown`.trim()}>{children}</Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <div className={`${className} reveal-group reveal-group--shown`.trim()}>
      {Children.map(children, (child) => (
        <div className="reveal-group-item">{child}</div>
      ))}
    </div>
  );
}
