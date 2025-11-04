"use client";

import { CategoryType } from "@/app/types";

import CategoryProductTabPanel from "./CategoryProductsTab";
type TPropProductList = {
  categories: CategoryType[];
};
const ProductsByCategory = (props: TPropProductList) => {
  const { categories } = props;
  return <CategoryProductTabPanel categories={categories} />;
};

export default ProductsByCategory;
