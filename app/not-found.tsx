import { Button } from "@/components/Button";
import { Eyebrow, Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="min-h-[62vh] flex items-center" spacing="standard">
      <div className="max-w-xl">
        <Eyebrow>404 · Off chart</Eyebrow>
        <h1 className="text-[32px] sm:text-[40px] leading-[1.08] tracking-[-0.01em] mb-4">
          This page isn&apos;t on the chart.
        </h1>
        <p className="text-[15.5px] text-structural leading-relaxed mb-8 max-w-lg">
          The page you&apos;re looking for may have moved or no longer exists. Return to the homepage,
          review the platform overview, or reach the team if you need a route restored.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button href="/">Go to homepage</Button>
          <Button href="/platform" variant="secondary">
            View the platform
          </Button>
          <Button href="/contact" variant="ghost">
            Contact
          </Button>
        </div>
      </div>
    </Section>
  );
}
