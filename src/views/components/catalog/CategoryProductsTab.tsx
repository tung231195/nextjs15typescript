"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { getProductsCategoryService } from "@/app/services/productService"; // 👈 import thêm
import { CategoryType, ProductType } from "@/app/types";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "./ProductItem";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function CustomTabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}
type TPropsCustomTab = {
  categories: CategoryType[];
};
export default function CategoryProductTabPanel({ categories }: TPropsCustomTab) {
  const [value, setValue] = React.useState(categories[1]._id);

  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // 🔹 Fetch products theo category ID
  React.useEffect(() => {
    if (!value) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const prods = await getProductsCategoryService(value);
        setProducts(prods || []);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Tabs header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="category tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories &&
            categories.map((c) => (
              <Tab key={c._id} label={c.name} value={c._id} {...a11yProps(c._id)} />
            ))}
        </Tabs>
      </Box>

      {/* Tab panels */}
      {categories &&
        categories.length > 0 &&
        categories.map((c) => (
          <CustomTabPanel key={c._id} value={value} index={c._id}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Box>
                <h3>{c.name}</h3>
                {products.length > 0 ? (
                  <ul>
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={20}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop
                      breakpoints={{
                        320: { slidesPerView: 1 }, // mobile
                        640: { slidesPerView: 2 }, // tablet nhỏ
                        1024: { slidesPerView: 3 }, // laptop
                        1280: { slidesPerView: 4 }, // desktop lớn
                      }}
                      className="rounded-2xl overflow-hidden shadow-lg"
                    >
                      {products &&
                        products.length > 0 &&
                        products.map((product) => {
                          return (
                            <SwiperSlide key={product._id}>
                              <ProductItem product={product} />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </ul>
                ) : (
                  <p>Không có sản phẩm trong danh mục này.</p>
                )}
              </Box>
            )}
          </CustomTabPanel>
        ))}
    </Box>
  );
}
