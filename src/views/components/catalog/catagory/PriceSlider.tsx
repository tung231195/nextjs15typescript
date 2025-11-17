"use client";
import * as React from "react";
import { Box, Slider, TextField, Stack } from "@mui/material";

function valuetext(value: number) {
  return `${value.toLocaleString()}₫`;
}

type TPropPriceSlider = {
  priceRange: number[]; // [min, max] đang chọn
  fullRange?: number[]; // [min, max] tổng thể để đặt giới hạn slider
  onChange?: (value: number[]) => void;
};

export default function PriceSlider({
  priceRange,
  fullRange = [0, 999],
  onChange,
}: TPropPriceSlider) {
  const handleChange = (_: Event, newValue: number[] | number) => {
    if (Array.isArray(newValue)) onChange?.(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={fullRange[0]}
        max={fullRange[1]}
        step={10}
      />

      {/* Hiển thị giá trị hai đầu */}
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          label="Min"
          value={priceRange[0].toLocaleString()}
          inputProps={{ readOnly: true }}
        />
        <TextField
          size="small"
          label="Max"
          value={priceRange[1].toLocaleString()}
          inputProps={{ readOnly: true }}
        />
      </Stack>
    </Box>
  );
}
