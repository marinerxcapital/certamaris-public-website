import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <div className="max-w-lg">
        <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-ocean mb-3">404</p>
        <h1 className="text-[32px] sm:text-[40px] leading-[1.1] mb-4">This page isn&apos;t part of the chart.</h1>
        <p className="text-[15.5px] text-structural leading-relaxed mb-8">
          The page you're looking for may have moved or no longer exists. Try the homepage, or head straight to the
          platform overview.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/">Go to homepage</Button>
          <Button href="/platform" variant="secondary">
            View the platform
          </Button>
        </div>
      </div>
    </Section>
  );
}
