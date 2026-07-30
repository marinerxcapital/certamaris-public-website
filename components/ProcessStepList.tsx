import type { ProcessStep } from "@/lib/content";

export function ProcessStepList({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="process-step-list grid md:grid-cols-5 gap-4">
      {steps.map((step, index) => (
        <li key={step.number} className="process-step-card relative">
          <div className="flex items-center gap-3 md:block">
            <span className="font-mono text-ocean text-[13px]">{step.number}</span>
            {index < steps.length - 1 && <span aria-hidden="true" className="hidden md:block h-px w-full bg-hairline mt-3" style={{ background: "var(--hairline)" }} />}
          </div>
          <h3 className="text-[16px] font-semibold mt-3 mb-1.5">{step.title}</h3>
          <p className="text-[13.5px] text-structural leading-relaxed">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
