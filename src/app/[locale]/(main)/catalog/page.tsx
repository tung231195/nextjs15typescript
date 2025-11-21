"use client";
// app/[locale]/catalog/page.tsx
import Link from "next/link";
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { getCategoriesService } from "@/app/services/categoryService";
import { CategoryType } from "@/app/types";

export default function CatalogPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    const fetListCategories = async () => {
      const list = await getCategoriesService();
      setCategories(list);
    };
    fetListCategories();
  }, []);
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={cat.slug}>
            <Card>
              <CardActionArea component={Link} href={`/catalog/${cat.slug}`}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore {cat.name} products
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
