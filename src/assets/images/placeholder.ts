/** Inline SVG fallback when a local asset fails to load */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#141010"/>
      <rect x="1" y="1" width="798" height="598" fill="none" stroke="#3a2020" stroke-width="2"/>
      <text x="400" y="300" text-anchor="middle" fill="#6a4040" font-family="system-ui,sans-serif" font-size="20" font-weight="600">NOVAFIT</text>
    </svg>`,
  );
