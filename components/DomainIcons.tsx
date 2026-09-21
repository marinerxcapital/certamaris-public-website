import type { ReactNode, SVGProps } from "react";
import type { AssuranceStageCode } from "@/lib/assurance-lifecycle";

export type DomainIconId =
  | AssuranceStageCode
  | "Fleet"
  | "Vessel"
  | "Org";

type IconProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function Svg({ title, children, className = "", ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      {...baseProps}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Simple line/mono maritime-technical icon set — no external icon library. */
export function DomainIcon({
  id,
  className = "",
  title,
  ...rest
}: IconProps & { id: DomainIconId }) {
  const props = { className, title, ...rest };

  switch (id) {
    case "REQ":
      return (
        <Svg {...props}>
          <path d="M7 3.5h7.5L19 8v12.5H7z" />
          <path d="M14.5 3.5V8H19" />
          <path d="M10 12h6M10 15.5h6M10 8.5h2" />
        </Svg>
      );
    case "APP":
      return (
        <Svg {...props}>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2" />
        </Svg>
      );
    case "CTL":
      return (
        <Svg {...props}>
          <path d="M12 3.5 19 7v5.2c0 4.3-2.9 7.4-7 8.8-4.1-1.4-7-4.5-7-8.8V7z" />
          <path d="M9.5 12.2 11.2 14l3.5-4" />
        </Svg>
      );
    case "ASM":
      return (
        <Svg {...props}>
          <circle cx="10.5" cy="10.5" r="5.5" />
          <path d="m14.5 14.5 4 4" />
          <path d="M8.5 10.5h4M10.5 8.5v4" />
        </Svg>
      );
    case "EVD":
      return (
        <Svg {...props}>
          <rect x="5" y="4" width="14" height="16" rx="1.5" />
          <path d="M9 9h6M9 12.5h6M9 16h4" />
          <path d="M15.5 16.5v1.2a1.3 1.3 0 0 1-2.6 0V16" />
        </Svg>
      );
    case "FND":
      return (
        <Svg {...props}>
          <path d="M12 4.5 20 19.5H4z" />
          <path d="M12 10v4.5M12 17.2h.01" />
        </Svg>
      );
    case "RSK":
      return (
        <Svg {...props}>
          <path d="M5 17.5a7.5 7.5 0 0 1 14 0" />
          <path d="M12 17.5V11l4-2.5" />
          <circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "CAP":
      return (
        <Svg {...props}>
          <path d="M14.5 5.5 18.5 9.5" />
          <path d="m8 18-3.2 1.2 1.2-3.2L14.2 7.8a2.1 2.1 0 0 1 3 3z" />
          <path d="M6.5 15.5 9 18" />
        </Svg>
      );
    case "QA":
      return (
        <Svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <path d="m8.5 12.2 2.4 2.4 4.6-5" />
        </Svg>
      );
    case "PKG":
      return (
        <Svg {...props}>
          <path d="M4.5 8.5 12 4.5l7.5 4V16.5L12 20.5 4.5 16.5z" />
          <path d="M12 12v8.5M4.5 8.5 12 12l7.5-3.5" />
        </Svg>
      );
    case "Fleet":
      return (
        <Svg {...props}>
          <path d="M3.5 15.5h17" />
          <path d="M5 15.5 7.5 9h4l1.2 2.5H16L18 15.5" />
          <path d="M8.5 9V7.5h2.2" />
          <path d="M4.5 17.5c1.2 1.2 2.8 1.8 4.5 1.8s3.3-.6 4.5-1.8" />
          <path d="M11.5 17.5c1 1 2.3 1.5 3.7 1.5s2.7-.5 3.7-1.5" opacity="0.7" />
        </Svg>
      );
    case "Vessel":
      return (
        <Svg {...props}>
          <path d="M3.5 15.5h17" />
          <path d="M5.5 15.5 8 8.5h5l1.5 3H17.5L19 15.5" />
          <path d="M9.5 8.5V6.5h2.5" />
          <path d="M6 17.5c1.4 1.4 3.2 2.1 5.2 2.1s3.8-.7 5.2-2.1" />
        </Svg>
      );
    case "Org":
      return (
        <Svg {...props}>
          <path d="M5 19.5V7.5l7-3.5 7 3.5v12" />
          <path d="M9 19.5v-5h6v5" />
          <path d="M9.5 10h1M13.5 10h1M9.5 13h1M13.5 13h1" />
        </Svg>
      );
    default:
      return null;
  }
}

export const DOMAIN_ICON_IDS: DomainIconId[] = [
  "REQ",
  "APP",
  "CTL",
  "ASM",
  "EVD",
  "FND",
  "RSK",
  "CAP",
  "QA",
  "PKG",
  "Fleet",
  "Vessel",
  "Org",
];
