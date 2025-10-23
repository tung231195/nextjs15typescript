"use client";
import { Grid, Box, TextField, IconButton, Typography, MenuItem, Button } from "@mui/material";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";

type AttributeOption = {
  _id: string;
  name: string;
  type: "string" | "number" | "boolean" | "enum";
  options?: { label: string; value: string }[];
};

type AttributeValueForm = {
  attribute: string; // _id của attribute
  valueString?: string;
  valueNumber?: number;
  valueBoolean?: boolean;
};

type ProductFormValues = {
  attributes: AttributeValueForm[];
};

type AttFormProps = {
  attributes: AttributeOption[];
};

const ProductAttributeForm = ({ attributes }: AttFormProps) => {
  const { control } = useFormContext<ProductFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });
  const watchedAttributes =
    useWatch({
      control,
      name: "attributes",
    }) || [];

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Product Attributes
      </Typography>

      <Grid container spacing={2}>
        {fields.map((field, index) => {
          const watchedAttrId = watchedAttributes?.[index]?.attribute;
          const selectedAttr = attributes.find((a) => a._id === watchedAttrId);
          console.log("aaaaaaaaaa", fields, selectedAttr);
          return (
            <Grid container spacing={2} alignItems="center" key={field.id}>
              {/* Chọn loại attribute */}
              <Grid>
                <Controller
                  name={`attributes.${index}.attribute`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Select Attribute" fullWidth size="small">
                      {attributes.map((attr) => (
                        <MenuItem key={attr._id} value={attr._id}>
                          {attr.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Nhập giá trị tùy theo type */}
              <Grid>
                {selectedAttr && (
                  <Controller
                    name={`attributes.${index}.${
                      selectedAttr.type === "number"
                        ? "valueNumber"
                        : selectedAttr.type === "boolean"
                          ? "valueBoolean"
                          : "valueString"
                    }`}
                    control={control}
                    render={({ field }) => {
                      switch (selectedAttr.type) {
                        case "number":
                          return (
                            <TextField
                              {...field}
                              type="number"
                              label={selectedAttr.name}
                              fullWidth
                              size="small"
                            />
                          );
                        case "boolean":
                          return (
                            <TextField
                              {...field}
                              select
                              label={selectedAttr.name}
                              fullWidth
                              size="small"
                            >
                              <MenuItem value="true">Yes</MenuItem>
                              <MenuItem value="false">No</MenuItem>
                            </TextField>
                          );
                        case "enum":
                          return (
                            <TextField
                              {...field}
                              select
                              label={selectedAttr.name}
                              fullWidth
                              size="small"
                            >
                              {selectedAttr.options?.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          );
                        default:
                          return (
                            <TextField
                              {...field}
                              label={selectedAttr.name}
                              fullWidth
                              size="small"
                            />
                          );
                      }
                    }}
                  />
                )}
              </Grid>

              <Grid>
                <IconButton onClick={() => remove(index)}>
                  <GridDeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      <Button
        startIcon={<GridAddIcon />}
        onClick={() =>
          append({
            attribute: "",
            valueString: "",
            valueNumber: undefined,
            valueBoolean: undefined,
          })
        }
        sx={{ mt: 2 }}
      >
        Add Attribute
      </Button>
    </Box>
  );
};

export default ProductAttributeForm;
