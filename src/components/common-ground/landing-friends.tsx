"use client";

/** Original friendly shape characters for the landing — not Habitz. */
export function LandingFriends({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 168"
      width="100%"
      height="168"
      aria-hidden
      focusable="false"
    >
      {/* soft ground shadow */}
      <ellipse cx="180" cy="158" rx="150" ry="10" fill="#E8DFF5" opacity="0.7" />

      {/* mint arch */}
      <g transform="translate(18 52)">
        <path
          d="M8 88c0-36 18-66 40-66s40 30 40 66H8Z"
          fill="#A8D5C2"
        />
        <circle cx="38" cy="48" r="3.2" fill="#2A2420" />
        <circle cx="58" cy="48" r="3.2" fill="#2A2420" />
        <path
          d="M42 60c4 5 12 5 16 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      {/* soft rose blob */}
      <g transform="translate(78 70)">
        <circle cx="36" cy="40" r="36" fill="#F2B8C6" />
        <circle cx="26" cy="34" r="3" fill="#2A2420" />
        <circle cx="46" cy="34" r="3" fill="#2A2420" />
        <path
          d="M28 46c5 6 15 6 20 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="18" cy="42" r="4" fill="#E8899A" opacity="0.55" />
        <circle cx="54" cy="42" r="4" fill="#E8899A" opacity="0.55" />
      </g>

      {/* butter yellow rounded square */}
      <g transform="translate(148 58)">
        <rect width="72" height="72" rx="22" fill="#F3D48A" />
        <circle cx="26" cy="30" r="3.2" fill="#2A2420" />
        <circle cx="46" cy="30" r="3.2" fill="#2A2420" />
        <path
          d="M28 44c5 5 15 5 20 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* tiny sparkle eye accent */}
        <path d="M56 18l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" fill="#2A2420" opacity="0.35" />
      </g>

      {/* periwinkle diamond */}
      <g transform="translate(218 64)">
        <path d="M36 4l32 36-32 36L4 40Z" fill="#B7C7F5" />
        <circle cx="28" cy="36" r="3" fill="#2A2420" />
        <circle cx="44" cy="36" r="3" fill="#2A2420" />
        <path
          d="M30 48c4 4 12 4 16 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>

      {/* coral cloud */}
      <g transform="translate(268 78)">
        <path
          d="M22 54c-12 0-20-8-20-18 0-9 7-16 16-17 3-10 14-16 24-12 8-8 22-6 28 4 10-2 20 6 20 16 0 12-10 21-24 21H22Z"
          fill="#F0A090"
        />
        <circle cx="34" cy="32" r="2.8" fill="#2A2420" />
        <circle cx="52" cy="32" r="2.8" fill="#2A2420" />
        <path
          d="M36 42c4 4 12 4 16 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      {/* small sage pebble in front */}
      <g transform="translate(128 118)">
        <ellipse cx="28" cy="18" rx="28" ry="18" fill="#C9E4D8" />
        <circle cx="20" cy="16" r="2.4" fill="#2A2420" />
        <circle cx="34" cy="16" r="2.4" fill="#2A2420" />
        <path
          d="M22 24c3 3 9 3 12 0"
          fill="none"
          stroke="#2A2420"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
