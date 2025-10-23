import {
  styled,
  SelectProps,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

/** ✅ Tùy chỉnh style riêng cho Select */
const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    padding: theme.spacing(1.5),
  },
}));

/** ✅ Kiểu prop hỗ trợ generic */
type TPropSelectField<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T, unknown>;
  label?: string;
  options: { label: string; value: string | number }[];
} & Omit<SelectProps, "name" | "value" | "onChange">;

/** ✅ Component chính */
export default function CustomSelectField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  ...rest
}: TPropSelectField<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ mt: 2 }} error={!!error}>
          {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
          <StyledSelect
            {...field}
            labelId={`${name}-label`}
            value={field.value ?? ""} // ✅ tránh undefined
            onChange={(e) => field.onChange(e.target.value)}
            {...rest}
          >
            {options.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </StyledSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
