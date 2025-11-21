"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: { images: string[] }) {
  console.log("image product", images);
  const defaultImage = images && images[0];
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage);

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
        {defaultImage && (
          <Image
            src={selectedImage ? selectedImage : defaultImage}
            alt="product"
            width={600}
            height={400}
            style={{ objectFit: "cover" }}
          />
        )}
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: "flex", gap: 1 }}>
        {images &&
          images.map((img, index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                border: selectedImage === img ? "2px solid #1976d2" : "1px solid #ddd",
              }}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt="thumb" width={80} height={80} style={{ objectFit: "cover" }} />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
