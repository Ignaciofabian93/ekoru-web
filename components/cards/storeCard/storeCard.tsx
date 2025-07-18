import Image from "next/image";
import React from "react";

interface StoreCardProps {
  name: string;
  description: string;
  brandLogo: string; // URL or import for the logo
  coverImage?: string; // Optional cover image
  onClick: () => void; // Function to handle click events
}

export default function StoreCard({ name, description, brandLogo, coverImage, onClick }: StoreCardProps) {
  return (
    <button
      onClick={onClick}
      className="store-card"
      style={{
        width: 300,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 120,
          background: coverImage
            ? `url(${coverImage}) center/cover no-repeat`
            : "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={brandLogo}
          alt={name + " logo"}
          width={64}
          height={64}
          style={{
            background: "#fff",
            borderRadius: "50%",
            padding: 8,
            boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
            objectFit: "contain",
          }}
        />
      </div>
      <div style={{ padding: 16, background: "#fff" }}>
        <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>{name}</p>
        <p style={{ color: "#666", fontSize: 14, margin: "8px 0 0 0" }}>{description}</p>
      </div>
    </button>
  );
}
