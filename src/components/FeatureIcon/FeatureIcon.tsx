type FeatureIconProps = {
  icon: string;
  className?: string;
};

export default function FeatureIcon({ icon, className }: FeatureIconProps) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 26 26"
      preserveAspectRatio="xMidYMid meet"
    >
      <use href={`/symbol-defs.svg#${icon}`} />
    </svg>
  );
}
