import { FormControl, FormControlLabel, FormHelperText, FormLabel, Switch } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type TPropsSwitch<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  onLabel?: string;
  offLabel?: string;
};

export default function CustomSwitchField<T extends FieldValues>({
  name,
  control,
  label = "Enable",
  onLabel = "Yes",
  offLabel = "No",
}: TPropsSwitch<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth sx={{ marginTop: "8px" }} error={!!error}>
          {label && <FormLabel component="legend">{label}</FormLabel>}

          <FormControlLabel
            control={
              <Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
            }
            label={field.value ? onLabel : offLabel}
          />

          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
