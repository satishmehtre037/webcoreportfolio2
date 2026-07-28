import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebCore Studio — AI & Software Development Company",
    short_name: "WebCore",
    description:
      "Handcrafted digital products, custom AI copilots, high-performance web platforms and brand systems for ambitious companies.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F3EA",
    theme_color: "#F7F3EA",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
