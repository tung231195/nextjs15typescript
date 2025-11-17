import { Box, Divider, Radio, Typography } from "@mui/material";

type AttributeType = {
  attributeName: string;
  attributeId: string;
  values: Record<string, number>[];
};
type TPropAttributes = {
  attributes: AttributeType[];
};
const ProductAttributes = ({ attributes }: TPropAttributes) => {
  return (
    <Box>
      {attributes &&
        attributes.map((attr) => {
          return (
            <Box key={attr.attributeId}>
              <Typography variant="body1">{attr.attributeName}</Typography>
              <Divider sx={{ mt: 2 }} />
              {attr.values &&
                attr.values.map((v) => {
                  if (!v.value) return;
                  return (
                    <Box key={v.value}>
                      <Typography variant="body1">{v.value}</Typography>
                      <Radio value={v.value} />
                    </Box>
                  );
                })}
            </Box>
          );
        })}
    </Box>
  );
};

export default ProductAttributes;
