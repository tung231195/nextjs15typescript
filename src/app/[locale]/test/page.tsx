// ❌ KHÔNG "use client"
import { getCategoriesService } from "@/app/services/categoryService";
import { getProductsCategoryService } from "@/app/services/productService";
import { Box, Typography, Grid } from "@mui/material";
import { CategoryType, ProductType } from "@/app/types";
import ProductItem from "@/views/components/catalog/ProductItem";

// ✅ SSR Component
export default async function CategoryProductTabPanelSSR() {
  // Lấy danh mục ở server
  const categories = await getCategoriesService();

  if (!categories || categories.length === 0) {
    return <Typography>Không có danh mục nào.</Typography>;
  }

  // Với mỗi category, lấy sản phẩm ở server luôn
  const categoriesWithProducts = await Promise.all(
    categories.map(async (cate: CategoryType) => {
      const products = await getProductsCategoryService(cate._id);
      return { ...cate, products: products || [] };
    }),
  );

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      {categoriesWithProducts.map((category) => (
        <Box key={category._id} sx={{ mb: 5 }}>
          {/* Tiêu đề danh mục */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "bold",
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              pb: 0.5,
            }}
          >
            {category.name}
          </Typography>

          {/* Danh sách sản phẩm */}
          {category.products.length > 0 ? (
            <Grid container spacing={2}>
              {category.products.map((product: ProductType) => (
                <Grid key={product._id}>
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Không có sản phẩm trong danh mục này.
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}
