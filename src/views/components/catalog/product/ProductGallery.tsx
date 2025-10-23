"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  console.log("image selected", images);
  const defaultImage = images ? images[0] : "/images/cms/1.jpg";
  const [selected, setSelected] = useState<string>(defaultImage);
  console.log("image selected", selected);

  return (
    <Box>
      {/* Main Image */}
      <Box
        sx={{
          width: "100%",
          height: 400,
          borderRadius: 3,
          overflow: "hidden",
          mb: 2,
        }}
      >
        <Image
          src={selected ? selected : defaultImage}
          alt="product"
          width={600}
          height={400}
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {images &&
          images.map((img) => (
            <Box
              key={img}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                border: selected === img ? "2px solid #1976d2" : "1px solid #ddd",
              }}
              onClick={() => setSelected(img)}
            >
              <Image src={img} alt="thumb" width={80} height={80} style={{ objectFit: "cover" }} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
