/**
 * Static nautical-chart texture for the chart-navy hero band: depth-contour
 * lines with occasional sounding marks. Pure SVG, server-rendered, no
 * animation — ambient linework only (decorative, aria-hidden).
 */
export function DepthContours({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="var(--accent-sounding)" strokeWidth="1">
        <path
          strokeOpacity="0.16"
          d="M-40 120 C 180 60, 420 170, 680 130 S 1150 40, 1480 110"
        />
        <path
          strokeOpacity="0.13"
          d="M-40 220 C 220 160, 460 280, 740 230 S 1180 140, 1480 220"
        />
        <path
          strokeOpacity="0.11"
          d="M-40 330 C 240 260, 520 390, 800 330 S 1220 250, 1480 340"
        />
        <path
          strokeOpacity="0.09"
          d="M-40 450 C 260 380, 540 510, 840 440 S 1240 370, 1480 460"
        />
        <path
          strokeOpacity="0.07"
          d="M-40 580 C 280 510, 560 640, 880 560 S 1260 500, 1480 590"
        />
        <path
          strokeOpacity="0.05"
          d="M-40 700 C 300 640, 600 760, 920 680 S 1280 630, 1480 710"
        />
        {/* dashed safety-contour accents — dots crawl like current markers on a
            chart (60–90s periods); frozen by prefers-reduced-motion in CSS */}
        <path
          className="contour-drift-a"
          strokeOpacity="0.1"
          strokeDasharray="1 7"
          d="M-40 170 C 200 110, 440 225, 710 180 S 1165 90, 1480 165"
        />
        <path
          className="contour-drift-b"
          strokeOpacity="0.07"
          strokeDasharray="1 7"
          d="M-40 390 C 250 320, 530 450, 820 385 S 1230 310, 1480 400"
        />
      </g>
      {/* sparse sounding marks (depth figures on charts); decorative */}
      <g
        fill="var(--accent-sounding)"
        fillOpacity="0.18"
        fontFamily="var(--font-mono), Consolas, monospace"
        fontSize="11"
      >
        <text x="180" y="105">27</text>
        <text x="560" y="205">42</text>
        <text x="940" y="118">36</text>
        <text x="1240" y="300">58</text>
        <text x="320" y="415">64</text>
        <text x="780" y="520">71</text>
        <text x="1120" y="620">85</text>
      </g>
    </svg>
  );
}
