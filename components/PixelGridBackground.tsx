type PixelGridBackgroundProps = {
  className?: string;
};

export function PixelGridBackground({
  className = "absolute inset-0 -z-10 pointer-events-none",
}: PixelGridBackgroundProps) {
  return (
    <div
      data-aifx="blocky"
      data-aifx-colors="#f4f8ff,#dceaff,#a9c9ff,#4f91ff,#006cfe"
      data-aifx-bg="#fbfdff"
      data-aifx-speed="0.16"
      data-aifx-block-size="72"
      data-aifx-levels="8"
      data-aifx-scale="1.15"
      data-aifx-drift-angle="24"
      data-aifx-glint="0.08"
      data-aifx-contrast="0.78"
      className={`pixel-grid-background ${className}`}
      aria-hidden="true"
    />
  );
}
