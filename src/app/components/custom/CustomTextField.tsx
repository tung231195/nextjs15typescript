import { styled, TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
type TPropTextField<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & TextFieldProps;
const StyleTextField = styled(TextField)({
  "& .MuiFormControl-root": {
    marginTop: "16px !important",
    color: "red !important",
  },
  "& .MuiOutlinedInput-root": {
    marginTop: "15px",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#888",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    marginTop: "20px",
    fontWeight: 600,
    color: "#555",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#1976d2",
  },
});

export default function CustomTextField<T extends FieldValues>(props: TPropTextField<T>) {
  const { name, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyleTextField
          {...field}
          {...rest}
          error={!!error}
          helperText={error ? error.message : props.helperText}
          fullWidth
        />
      )}
    />
  );
}
