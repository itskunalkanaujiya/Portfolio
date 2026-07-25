import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "YOUR_NAME | Portfolio",
    short_name: "YOUR_NAME",
    description: "YOUR_NAME — Software Engineer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#050816",
    theme_color: "#7C3AED",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
