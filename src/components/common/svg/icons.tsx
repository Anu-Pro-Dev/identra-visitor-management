export const LogoIcon = ({ color }: { color?: string }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // Animate the color property, not fill
    style={{ color: color || "var(--primary, #ab00c5)" }}
  >
    <g
      clipPath="url(#a)"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    >
      <path d="M15.972 7.303A6.25 6.25 0 0 0 12.5 6.25V0A12.5 12.5 0 1 1 0 12.5h6.25a6.25 6.25 0 1 0 9.722-5.197" />
      <path d="M6.25 0A6.25 6.25 0 0 1 0 6.25v6.25A12.5 12.5 0 0 0 12.5 0z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h25v25H0z" />
      </clipPath>
    </defs>
  </svg>
);