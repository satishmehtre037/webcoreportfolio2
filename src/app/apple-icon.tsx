import { ImageResponse } from "next/og";


export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
          background: "#7A2E3A",
          border: "10px solid #111111",
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M 4 7 L 9 21 L 14 10 L 19 21 L 24 7"
            stroke="#FDF5E6"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
