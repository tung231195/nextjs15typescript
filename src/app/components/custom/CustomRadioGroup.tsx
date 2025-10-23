import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type TRadioOption = {
  label: string;
  value: string | number;
};

type TPropsCustomRadio<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: TRadioOption[];
  row?: boolean;
};

export default function CustomRadioGroupField<T extends FieldValues>({
  name,
  control,
  label,
  options,
  row = true,
}: TPropsCustomRadio<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset" error={!!error}>
          {label && <FormLabel component="legend">{label}</FormLabel>}
          <RadioGroup
            {...field}
            row={row}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
