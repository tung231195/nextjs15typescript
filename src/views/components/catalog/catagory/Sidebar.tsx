import PriceSlider from "./PriceSlider";
import { Box, Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategoriesService } from "@/app/services/categoryService";
import { AttributeType } from "@/app/types";
import { getAttributesService } from "@/app/services/attributeService";
import AttributeVariants from "./attributes/AttributeVariant";
//import ProductAttributes from "../product/ProductAttributes";

type Category = {
  _id: string;
  name: string;
  slug: string;
};
type FacetType = {
  colors: { _id: string; count: number }[];
  sizes: { _id: string; count: number }[];
  attributes: {
    values: { _id: string; count: number }[];
    attributeId: string;
    attributeName: string;
  };
};
type SidebarProps = {
  onPriceChange?: (range: number[]) => void;
  priceRange: number[];
  fullRange?: number[];
  facets: FacetType;
  handleChangeVariant: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    attribute: string,
  ) => void;
};

const Sidebar = ({
  onPriceChange,
  priceRange,
  fullRange,
  facets,
  handleChangeVariant,
}: SidebarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [attributes, setAttributes] = useState<AttributeType[]>([]);
  useEffect(() => {
    getCategoriesService().then(setCategories).catch(console.error);
  }, []);
  useEffect(() => {
    getAttributesService().then(setAttributes).catch(console.error);
  }, []);

  //const variantAttributes = attributes.filter((a) => a.type === "enum");

  return (
    <Box sx={{ width: 260, borderRight: "1px solid #e0e0e0", p: 2 }}>
      <Typography variant="h6" fontWeight={700}>
        Categories
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List>
        {categories.map((c) => (
          <Link key={c._id} href={`/catalog/${c.slug}`} style={{ textDecoration: "none" }}>
            <ListItemButton>
              <ListItemText primary={c.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" fontWeight={700}>
        Price
      </Typography>
      {priceRange && (
        <PriceSlider fullRange={fullRange} priceRange={priceRange} onChange={onPriceChange} />
      )}
      <Divider sx={{ my: 2 }} />
      {facets && (
        <AttributeVariants handleChangeVariant={handleChangeVariant} attributes={facets} />
      )}
      <Divider sx={{ my: 2 }} />
      {/* {facets && <ProductAttributes att={facets.attributes} />} */}
    </Box>
  );
};

export default Sidebar;
