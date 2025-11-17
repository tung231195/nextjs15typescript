import { Box, Checkbox, Typography } from "@mui/material";
import { ChangeEvent } from "react";
type FacetType = {
  colors: { _id: string; count: number }[];
  sizes: { _id: string; count: number }[];
  attributes: {
    values: { _id: string; count: number }[];
    attributeId: string;
    attributeName: string;
  };
};

type TPropAttributeVariant = {
  attributes: FacetType;
  handleChangeVariant: (e: ChangeEvent<HTMLInputElement>, type: string, attribute: string) => void;
};

const AttributeVariants = ({ attributes, handleChangeVariant }: TPropAttributeVariant) => {
  const fillterColors = attributes.colors;
  const fillterSizes = attributes.sizes;

  return (
    <>
      {/* <ColorCheckboxes /> */}
      <Typography>Color</Typography>
      {fillterColors &&
        fillterColors.length > 0 &&
        fillterColors.map((a: { _id: string; count: number }, key: number) => {
          return (
            <Box key={key}>
              <Checkbox
                sx={{ color: a._id }}
                onChange={(e) => handleChangeVariant(e, "color", a._id)}
              />
            </Box>
          );
        })}
      <Typography>Size</Typography>
      {fillterSizes &&
        fillterSizes.length > 0 &&
        fillterSizes.map((a: { _id: string; count: number }, key: number) => {
          return (
            <Box key={key}>
              <Checkbox onChange={(e) => handleChangeVariant(e, "size", a._id)} />
            </Box>
          );
        })}
    </>
  );
};

export default AttributeVariants;
