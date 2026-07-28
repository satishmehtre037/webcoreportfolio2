import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "WebCore — AI & Software Studio";
    const category = searchParams.get("category") || "Software Engineering & AI";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#1C1917",
            padding: "80px",
            fontFamily: "sans-serif",
            color: "#F7F3EA",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#C1502F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              W
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#F7F3EA",
              }}
            >
              WebCore Studio
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontSize: "18px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#C1502F",
                fontWeight: 600,
              }}
            >
              {category}
            </span>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#FFFFFF",
                margin: 0,
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid #332D29",
              paddingTop: "32px",
            }}
          >
            <span style={{ fontSize: "20px", color: "#A8A29E" }}>
              webcorestudio.vercel.app
            </span>
            <span style={{ fontSize: "20px", color: "#A8A29E" }}>
              Craft Over Templates
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(`Failed to generate the OG image: ${error.message}`, {
      status: 500,
    });
  }
}
