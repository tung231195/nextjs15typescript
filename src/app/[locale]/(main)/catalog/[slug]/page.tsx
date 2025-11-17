import { getCategoryProducts } from "@/app/services/productService";
import CategoryProduct from "@/views/components/catalog/catagory/CategoryProduct";
type TPropCategoryProduct = {
  params: Promise<{ slug: string }>;
};
const CategoryPage = async ({ params }: TPropCategoryProduct) => {
  const { slug } = await params;
  const productCollection = await getCategoryProducts({ slug: slug });
  console.log("productCollection", productCollection);
  return (
    <CategoryProduct
      facets={productCollection.facets}
      slug={slug}
      products={productCollection.products}
    />
  );
};

export default CategoryPage;
