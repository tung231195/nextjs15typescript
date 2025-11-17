"use client";

import dynamic from "next/dynamic";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { FormControl, FormHelperText, Typography } from "@mui/material";

// 👇 Import ReactQuill bằng dynamic, tắt SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

type CustomEditorProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: boolean;
  helperText?: string;
};

export default function CustomRichEditor<T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
}: CustomEditorProps<T>) {
  return (
    <FormControl fullWidth error={error} sx={{ mt: 2 }}>
      {label && (
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          {label}
        </Typography>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ header: [1, 2, 3, false] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            style={{ background: "white" }}
          />
        )}
      />

      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
