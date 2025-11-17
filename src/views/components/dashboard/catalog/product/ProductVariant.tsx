"use client";
import { Grid, Box, TextField, IconButton, Typography, MenuItem, Button } from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid";
import { AttributeOption, ProductVariant } from "@/app/types";

type VariantFormProps = {
  attributes: AttributeOption[];
};

const ProductVariantForm = ({ attributes }: VariantFormProps) => {
  const variantAttr = attributes.filter((a) => a.type === "enum");
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <Box mt={3}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Product Variants
      </Typography>

      {fields.map((field, index) => (
        <Grid
          container
          key={field.id}
          spacing={2}
          sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2, mb: 2 }}
        >
          <Grid>
            <Controller
              name={`variants.${index}.sku`}
              control={control}
              render={({ field }) => <TextField {...field} label="SKU" fullWidth size="small" />}
            />
          </Grid>

          <Grid>
            <Controller
              name={`variants.${index}.price`}
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Price" fullWidth size="small" />
              )}
            />
          </Grid>

          <Grid>
            <Controller
              name={`variants.${index}.stock`}
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Stock" fullWidth size="small" />
              )}
            />
          </Grid>

          <Grid>
            <Typography variant="subtitle2" mb={1}>
              Attributes
            </Typography>
            <Grid container spacing={2}>
              {variantAttr.map((attr, attrIndex) => {
                if (attr.type === "enum") {
                  return (
                    <Grid key={attrIndex}>
                      <Controller
                        name={`variants.${index}.attributes.${attrIndex}.valueString`}
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} select label={attr.name} fullWidth size="small">
                            {attr &&
                              attr.options &&
                              attr.options.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </MenuItem>
                              ))}
                          </TextField>
                        )}
                      />
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Grid>

          <Grid display="flex" alignItems="center">
            <IconButton color="error" onClick={() => remove(index)}>
              <GridDeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button
        startIcon={<GridAddIcon />}
        onClick={() =>
          append({
            sku: "",
            price: 0,
            stock: 0,
            attributes: variantAttr.map((a) => ({
              attribute: a._id,
              valueString: "",
            })),
            images: [],
          } as ProductVariant)
        }
      >
        Add Variant
      </Button>
    </Box>
  );
};

export default ProductVariantForm;
