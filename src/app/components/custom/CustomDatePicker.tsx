"use client";

import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MUIDatePickerProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

const CustomDatePicker: React.FC<MUIDatePickerProps> = ({
  label = "Chọn ngày",
  value,
  onChange,
  minDate,
  maxDate,
  required = false,
  error = false,
  helperText,
}) => {
  return (
    <DatePicker
      selected={value ?? null} // ✅ đảm bảo không undefined
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      dateFormat="dd/MM/yyyy"
      customInput={
        <TextField
          label={label}
          required={required}
          error={error}
          helperText={helperText}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarTodayIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      }
      popperPlacement="bottom-start"
      showPopperArrow={false}
      shouldCloseOnSelect
    />
  );
};

export default CustomDatePicker;
