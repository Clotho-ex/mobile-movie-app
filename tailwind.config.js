/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // Core theme colors - easily changeable
        primary: {
          light: "#FFFFFF",
          dark: "#1A1B23",
          DEFAULT: "#FFFFFF", // Default to light for fallback
        },
        secondary: {
          light: "#E5E7EB",
          dark: "#2A2D3A",
          DEFAULT: "#E5E7EB",
        },
        background: {
          light: "#FFFFFF",
          dark: "#1A1B23",
          DEFAULT: "#FFFFFF",
        },
        surface: {
          light: "##C1C1C1",
          dark: "#2A2D3A",
          DEFAULT: "#E5E7EB",
        },
        text: {
          primary: {
            light: "#111827",
            dark: "#FFFFFF",
            DEFAULT: "#111827",
          },
          secondary: {
            light: "#4B5563",
            dark: "#A8B5DB",
            DEFAULT: "#4B5563",
          },
          accent: {
            light: "#7C3AED",
            dark: "#AB8BFF",
            DEFAULT: "#7C3AED",
          },
        },
        border: {
          light: "#D1D5DB",
          dark: "#374151",
          DEFAULT: "#D1D5DB",
        },
        card: {
          light: "#F9FAFB",
          dark: "#2A2D3A",
          DEFAULT: "#F9FAFB",
        },
        overlay: {
          light: "rgba(0, 0, 0, 0.15)",
          dark: "rgba(42, 45, 58, 0.4)",
          DEFAULT: "rgba(0, 0, 0, 0.15)",
        },
        // Semantic color aliases using theme colors
        accent: {
          light: "#7C3AED",
          dark: "#AB8BFF",
          DEFAULT: "#AB8BFF", // Keep existing default
        },
        // Legacy colors for backwards compatibility
        light: {
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221F3D",
          200: "#0F0D23",
        },
      },
    },
  },
  plugins: [],
};
