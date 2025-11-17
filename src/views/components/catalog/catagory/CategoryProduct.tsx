"use client";
import { ATTRIBUTE_COLOR_ID, ATTRIBUTE_SIZE_ID, ProductType } from "@/app/types";
import ProductItem from "../ProductItem";
import { Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { getCategoryProducts, getPriceRange } from "@/app/services/productService";
// NOTE: Thay bằng ObjectId thực sự của color/size attribute trong DB

type AttributeVariant = {
  attributeId: typeof ATTRIBUTE_COLOR_ID | typeof ATTRIBUTE_SIZE_ID;
  valueString: string;
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

type TPropCategoryProduct = {
  products: ProductType[];
  facets: FacetType;
  slug: string;
};
const CategoryProduct = ({ products: initialProducts, slug, facets }: TPropCategoryProduct) => {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [priceRangeDB, setPriceRangeDB] = useState<number[]>([0, 0]);
  const [variantsAtt, setVariantsAtt] = useState<AttributeVariant[]>([]);
  // Khi người dùng kéo thanh giá, gọi API để lọc lại
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const [minPrice, maxPrice] = priceRange;
      const res = await getCategoryProducts({ slug, minPrice, maxPrice, variants: variantsAtt });
      setProducts(res.products);
    };
    fetchCategoryProducts();
  }, [priceRange, variantsAtt]);
  const handlePriceChange = async (range: number[]) => {
    setPriceRange(range);
  };
  // ✅ Fetch min-max price 1 lần khi slug đổi
  useEffect(() => {
    const fetchPriceRangeDB = async () => {
      try {
        const res = await getPriceRange(slug);
        const range = [res.minPrice, res.maxPrice];
        setPriceRangeDB(range);
        setPriceRange(range); // <-- Gán luôn cho slider
      } catch (error) {
        console.error("Failed to fetch price range:", error);
      }
    };
    if (slug) fetchPriceRangeDB();
  }, [slug]);
  const handleChangeVariant = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
    value: string,
  ) => {
    if (type == "color") {
      if (variantsAtt && variantsAtt.some((v) => v.valueString === value)) {
        setVariantsAtt((prev) => prev.filter((v) => v.valueString !== value));
      } else {
        setVariantsAtt((prev) => [
          ...prev,
          { attributeId: ATTRIBUTE_COLOR_ID, valueString: value },
        ]);
      }
    } else {
      if (variantsAtt.some((v) => v.valueString === value)) {
        setVariantsAtt((prev) => prev.filter((v) => v.valueString !== value));
      } else {
        setVariantsAtt((prev) => [...prev, { attributeId: ATTRIBUTE_SIZE_ID, valueString: value }]);
      }
    }
  };

  return (
    <>
      <Grid container>
        <Grid size={{ md: 2 }}>
          <Sidebar
            fullRange={priceRangeDB}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            facets={facets}
            handleChangeVariant={handleChangeVariant}
          />
        </Grid>
        <Grid size={{ md: 10 }}>
          <Grid container>
            {products &&
              products.length > 0 &&
              products.map((p) => {
                return (
                  <Grid size={{ md: 3 }} key={p._id}>
                    <ProductItem product={p} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryProduct;
