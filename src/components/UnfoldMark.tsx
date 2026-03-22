interface UnfoldMarkProps {
  size?: number;
  color?: string;
  dotColor?: string;
  ringColor?: string;
  showRing?: boolean;
}

export function UnfoldMark({ size = 20, color = "currentColor", dotColor = "#2B5CE6", ringColor = "currentColor", showRing = true }: UnfoldMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {showRing && <circle cx="20" cy="20" r="18" stroke={ringColor} strokeWidth="2" fill="none" />}
      <circle cx="14" cy="20" r="4" fill={color} />
      <circle cx="26" cy="20" r="4" fill={dotColor} />
    </svg>
  );
}
