export const Logo = ({ className }: { className?: string }) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="url(#paint0_linear_1_2)" />
    <path
      d="M23.5 18H32.5C37.4706 18 41.5 22.0294 41.5 27V37C41.5 41.9706 37.4706 46 32.5 46H23.5V18Z"
      fill="white"
      fillOpacity="0.1"
    />
    <path
      d="M23 18V46H32C36.9706 46 41 41.9706 41 37V27C41 22.0294 36.9706 18 32 18H23Z"
      stroke="white"
      strokeWidth="3"
    />
    <circle cx="23" cy="32" r="4" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_1_2"
        x1="0"
        y1="0"
        x2="64"
        y2="64"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6666CC" />
        <stop offset="1" stopColor="#8080d9" />
      </linearGradient>
    </defs>
  </svg>
);
