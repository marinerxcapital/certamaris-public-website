type PixelGridBackgroundProps = {
  className?: string;
};

export function PixelGridBackground({
  className = "fixed inset-0 z-0 pointer-events-none",
}: PixelGridBackgroundProps) {
  return (
    <div
      data-aifx="blocky"
      data-aifx-colors="#F4F8FF,#DCEAFF,#A9C9FF,#4F91FF,#006CFE,#012B6D"
      data-aifx-bg="#FBFDFF"
      data-aifx-bg-alpha="1"
      data-aifx-speed="0.16"
      data-aifx-block-size="72"
      data-aifx-levels="8"
      data-aifx-scale="1.15"
      data-aifx-drift-angle="24"
      data-aifx-glint="0.14"
      data-aifx-contrast="1.45"
      className={`pixel-grid-background ${className}`}
      aria-hidden="true"
    />
  );
}
