import { Box, FormControl, FormLabel, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type TPropTextField<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
} & TextFieldProps;

export default function CustomTextField2<T extends FieldValues>({
  name,
  control,
  label,
  ...rest
}: TPropTextField<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            {/* Label bên trái */}
            <FormLabel
              sx={{
                minWidth: 120,
                fontWeight: 600,
                color: "#333",
              }}
            >
              {label}
            </FormLabel>

            {/* Input bên phải */}
            <TextField
              {...field}
              {...rest}
              error={!!error}
              helperText={error ? error.message : ""}
              fullWidth
              size="small"
            />
          </Box>
        </FormControl>
      )}
    />
  );
}
