type MotionFieldProps = {
  variant?: "hero" | "proof" | "process";
  className?: string;
};

export function MotionField({ variant = "proof", className = "" }: MotionFieldProps) {
  return (
    <div className={`motion-field motion-field--${variant} ${className}`} aria-hidden="true">
      <span className="motion-field__grid" />
      <span className="motion-field__trace motion-field__trace--one" />
      <span className="motion-field__trace motion-field__trace--two" />
      <span className="motion-field__sweep" />
    </div>
  );
}
