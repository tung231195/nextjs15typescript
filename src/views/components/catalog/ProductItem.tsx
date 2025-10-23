import { CartItem, ProductType } from "@/app/types";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Box, Button, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import useCart from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";

type TPropProductItem = {
  product: ProductType;
};

const ProductItem = ({ product }: TPropProductItem) => {
  const MotionCard = motion(Box);
  /** dispatch */
  const { add } = useCart();
  const router = useRouter();
  const handleAddToCart = (product: ProductType) => {
    const payload: CartItem = {
      product: product._id,
      name: product.name,
      quantity: 1,
      price: product.price,
      image: product?.images && product?.images[0] ? product.images[0] : "",
    };
    add(payload);
  };

  const handleProductPage = (id: string) => {
    router.push(`/catalog/product/${id}`);
  };
  return (
    <MotionCard
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      sx={{
        maxWidth: 345,
        mt: 2,
        position: "relative",
        overflow: "hidden",
        boxShadow: 2,
        "&:hover .action": {
          bottom: 0,
          opacity: 1,
        },
      }}
    >
      <CardMedia
        onClick={() => handleProductPage(product._id)}
        sx={{ height: 240 }}
        image={product.images?.[0] || ""}
        title={product.name}
      />
      <Chip label={"10%"} color="error" sx={{ position: "absolute", top: 10, left: 0 }} />
      <Chip label={"New"} color="primary" sx={{ position: "absolute", top: 10, right: 0 }} />
      <CardContent>
        <Typography gutterBottom variant="h6" fontWeight={600}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} color="primary">
          ${product.price}
        </Typography>
      </CardContent>

      <CardActions
        className="action"
        sx={{
          position: "absolute",
          bottom: "-150px",
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          bgcolor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(6px)",
          opacity: 0,
          transition: "all 0.35s ease",
          p: 1.5,
        }}
      >
        <Button
          fullWidth
          onClick={() => handleAddToCart(product)}
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <Icon icon="flowbite:cart-outline" width={22} height={22} />
          <Typography sx={{ ml: 1 }}>Add to Cart</Typography>
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.200",
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          <Icon icon="flowbite:heart-outline" width={22} height={22} />
          <Typography sx={{ ml: 1 }}>Add to Wishlist</Typography>
        </Button>

        <Button
          fullWidth
          sx={{
            bgcolor: "grey.200",
            "&:hover": { bgcolor: "grey.300" },
          }}
        >
          <Icon icon="lets-icons:view-light" width={22} height={22} />
          <Typography sx={{ ml: 1 }}>Quick View</Typography>
        </Button>
      </CardActions>
    </MotionCard>
  );
};

export default ProductItem;
