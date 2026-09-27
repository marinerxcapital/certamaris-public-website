import Link from "next/link";
import { assuranceStages, type AssuranceStageCode } from "@/lib/assurance-lifecycle";

type AssuranceStepperVariant = "abbreviated" | "full";

const ABBREVIATED_CODES: AssuranceStageCode[] = ["REQ", "EVD", "FND", "CAP", "PKG"];

export function AssuranceStepper({
  variant,
  className = "",
  linkHref,
  linkLabel = "See the full record chain →",
}: {
  variant: AssuranceStepperVariant;
  className?: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  const codes = variant === "abbreviated" ? ABBREVIATED_CODES : assuranceStages.map((stage) => stage.code);
  const stages = codes.map((code) => {
    const stage = assuranceStages.find((item) => item.code === code);
    if (!stage) throw new Error(`Missing assurance stage ${code}`);
    return stage;
  });

  return (
    <div className={`assurance-stepper assurance-stepper--${variant} ${className}`.trim()}>
      <ol className="assurance-stepper-list" aria-label={`${variant} assurance record chain`}>
        {stages.map((stage, index) => (
          <li key={stage.code} className="assurance-stepper-item">
            <span className="assurance-stepper-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="assurance-stepper-code">{stage.code}</span>
            <span className="assurance-stepper-label">{stage.label}</span>
          </li>
        ))}
      </ol>
      {linkHref ? (
        <Link href={linkHref} className="mt-3 inline-block text-[14px] font-semibold text-ocean hover:underline">
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
