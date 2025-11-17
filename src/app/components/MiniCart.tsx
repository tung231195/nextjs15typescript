import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import { Icon } from "@iconify/react";
import { Box, CardMedia, Divider, Typography } from "@mui/material";
import useCart from "../hooks/useCart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getCartAction } from "../store/slices/cartSlice";
import { useRouter } from "next/navigation";

export default function MiniCart() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(getCartAction());
  }, [dispatch]);
  const { cartItems, subTotalPrice, totalQty, remove } = useCart();
  /*** hanldle  */
  const gotoCheckout = () => {
    router.push("/checkout");
    return;
  };

  const gotoCart = () => {
    router.push("/cart");
    return;
  };

  return (
    <div>
      <Button
        sx={{ color: "#fff" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon icon="mynaui:cart" width="24" height="24" />
        <Typography>({totalQty ? totalQty : 0})</Typography>
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ width: 300 }}>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((product) => {
              return (
                <Box key={`cart_${product.product}`}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      mb: 2,
                      padding: "10px",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 50, width: 50 }}
                      image={`${process.env.NEXT_PUBLIC_SOCKET_URL}${product.image}` || ""}
                      title={product.name}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", padding: "10px 10px" }}>
                      <Typography variant="body1">{product.name}</Typography>
                      <Typography variant="body1">{product.price}</Typography>
                    </Box>
                    <Icon
                      onClick={() => remove(product.product)}
                      icon="line-md:remove"
                      width="24"
                      height="24"
                    />
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          <Box>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                color: "red",
                display: "block",
                padding: "10px 0",
              }}
            >
              Sub Total: {subTotalPrice}
            </Typography>
            <Button onClick={gotoCart} fullWidth variant="outlined">
              Go to cart
            </Button>
            <Button onClick={gotoCheckout} fullWidth variant="outlined" sx={{ mt: 2 }}>
              checkout now
            </Button>
          </Box>
        </Box>
      </Menu>
    </div>
  );
}
