import React from 'react'

/**
 * Arroba Banda Larga logo SVG.
 * @param {number}  height      - Height in px (default 40)
 * @param {string}  textColor   - Color for "ARROBA" text (default #fff for dark backgrounds)
 */
export default function Logo({ height = 40, textColor = '#ffffff' }) {
  return (
    <svg
      viewBox="0 0 210 52"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height, width: 'auto', display: 'block' }}
      aria-label="Arroba Banda Larga"
    >
      {/* Concentric rings */}
      <circle cx="26" cy="26" r="23" fill="none" stroke="#F5A200" strokeWidth="2.8" />
      <circle cx="26" cy="26" r="16.5" fill="none" stroke="#F5A200" strokeWidth="2" />
      <circle cx="26" cy="26" r="10" fill="#F5A200" />

      {/* @ hook */}
      <path
        d="M26 16 A10 10 0 1 1 36 26 L36 30.5 A5 5 0 0 1 26 30.5 L26 26"
        fill="none"
        stroke="#1B4FA8"
        strokeWidth="3.4"
        strokeLinecap="round"
      />

      {/* ARROBA wordmark */}
      <text
        x="58" y="30"
        fontFamily="-apple-system, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill={textColor}
        letterSpacing="-0.5"
      >
        ARROBA
      </text>

      {/* Banda Larga tagline */}
      <text
        x="60" y="44"
        fontFamily="-apple-system, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="12"
        fill="#F5A200"
        letterSpacing="2"
      >
        Banda Larga
      </text>
    </svg>
  )
}
