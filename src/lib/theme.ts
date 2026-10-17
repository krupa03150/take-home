"use client";

import { createLightTheme } from "baseui";

/** Warm, approachable Common Ground theme on Base Web + Uber Move. */
export const commonGroundTheme = createLightTheme({
  colors: {
    // Brand / accent — deep sage (human, outdoor, community)
    accent: "#2F6F5E",
    accent50: "#EAF4F0",
    accent100: "#C9E4D8",
    accent200: "#96C9B4",
    accent300: "#63A98F",
    accent400: "#3F8A74",
    accent500: "#2F6F5E",
    accent600: "#245749",
    accent700: "#1A3F35",
    contentAccent: "#245749",
    borderAccent: "#2F6F5E",
    backgroundAccent: "#2F6F5E",
    backgroundAccentLight: "#EAF4F0",

    // Warm stone surfaces (not clinical white)
    backgroundPrimary: "#F3EDE4",
    backgroundSecondary: "#EBE3D6",
    backgroundTertiary: "#DFD4C4",
    backgroundInversePrimary: "#2A2420",
    backgroundInverseSecondary: "#3D342E",

    contentPrimary: "#2A2420",
    contentSecondary: "#5C534C",
    contentTertiary: "#7A7168",
    contentInversePrimary: "#FFFBF5",
    contentInverseSecondary: "#E8DFD2",
    contentInverseTertiary: "#C9BDB0",

    borderOpaque: "#D9CDBD",
    borderTransparent: "rgba(42, 36, 32, 0.1)",
    borderSelected: "#2F6F5E",

    brandBackgroundPrimary: "#2F6F5E",
    brandBackgroundSecondary: "#EAF4F0",
    brandBackgroundTertiary: "#DFD4C4",
    brandContentPrimary: "#2A2420",
    brandContentOnPrimary: "#FFFBF5",
    brandContentOnSecondary: "#245749",
    brandBorderAccessible: "#2F6F5E",
    brandBorderSubtle: "#D9CDBD",

    backgroundOverlay: "rgba(42, 36, 32, 0.45)",
  },
});
