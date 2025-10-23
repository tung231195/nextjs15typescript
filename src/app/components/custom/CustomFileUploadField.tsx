"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertFileToBase64 } from "@/app/utils";
import Image from "next/image";

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  multiple?: boolean;
};

export default function CustomFileUploadField<T extends FieldValues>({
  name,
  control,
  label,
  multiple = false,
}: Props<T>) {
  const {
    field: { value = [], onChange },
  } = useController({ name, control });

  const [previews, setPreviews] = useState<string[]>(
    (value as string[]).filter((v): v is string => !!v),
  );

  // Khi form reset hoặc load dữ liệu cũ => đồng bộ previews
  useEffect(() => {
    setPreviews((value as string[]).filter((v): v is string => !!v));
  }, [value]);

  // ✅ Xử lý upload và convert sang base64
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const base64List = await Promise.all(
      Array.from(files).map(async (file) => await convertFileToBase64(file)),
    );

    const updated = multiple ? [...previews, ...base64List] : base64List;
    setPreviews(updated);
    onChange(updated);
  };

  // ✅ Xóa ảnh
  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange(updated);
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {label}
        </Typography>
      )}

      <Button variant="outlined" component="label" startIcon={<ImageIcon />} sx={{ mb: 2 }}>
        Upload Image
        <input type="file" hidden multiple={multiple} accept="image/*" onChange={handleFiles} />
      </Button>

      <Grid container spacing={2}>
        {previews.map((src, index) => (
          <Grid key={index}>
            <Box
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                border: "1px solid #ccc",
              }}
            >
              <Image
                src={src}
                alt={`preview-${index}`}
                fill
                sizes="100px"
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemove(index)}
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bgcolor: "white",
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
