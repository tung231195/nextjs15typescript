"use client";

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
import { useLocale } from "next-intl";
import PriceFormat from "@/views/components/catalog/Price";
import Link from "next/link";

export default function MiniCart() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const dispatch = useDispatch<AppDispatch>();
  React.useEffect(() => {
    dispatch(getCartAction());
  }, [dispatch]);

  const locale = useLocale();
  const { cartItems, subTotalPrice, totalQty, remove } = useCart();

  return (
    <div id="mini-cart">
      {/* Trigger Button */}
      <Button
        sx={{ color: "#fff" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Icon icon="mynaui:cart" width="24" height="24" />
        <Typography sx={{ ml: 0.5 }}>({totalQty ?? 0})</Typography>
      </Button>

      {/* Dropdown Menu */}
      <Menu
        id="fade-menu"
        slotProps={{ list: { "aria-labelledby": "fade-button" } }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ width: 300, maxHeight: 400, overflowY: "auto", p: 1 }}>
          {cartItems?.length ? (
            <>
              {cartItems.map((product) => (
                <Box key={`cart_${product.product}`} sx={{ mb: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "8px",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 50, width: 50, borderRadius: 1 }}
                      image={`${process.env.NEXT_PUBLIC_SOCKET_URL}${product.image}` || ""}
                      title={product.name}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column", ml: 1, flexGrow: 1 }}>
                      <Typography variant="body1" noWrap>
                        {product.name}
                      </Typography>
                      <PriceFormat
                        amount={product.price}
                        saleAmount={product.discount}
                        locale={locale}
                      />
                    </Box>
                    <Icon
                      onClick={() => remove(product.product)}
                      icon="line-md:remove"
                      width="24"
                      height="24"
                      style={{ cursor: "pointer" }}
                      aria-label="Remove item"
                    />
                  </Box>
                  <Divider />
                </Box>
              ))}

              <Box sx={{ mt: 1 }}>
                <Typography sx={{ width: "100%", textAlign: "center", color: "red", mb: 1 }}>
                  Sub Total: {subTotalPrice ?? 0}
                </Typography>

                <Button
                  component={Link}
                  href="/cart"
                  fullWidth
                  variant="outlined"
                  sx={{ textDecoration: "none", mb: 1 }}
                >
                  Go to cart
                </Button>

                <Button
                  component={Link}
                  href="/checkout"
                  fullWidth
                  variant="outlined"
                  sx={{ textDecoration: "none" }}
                >
                  Checkout now
                </Button>
              </Box>
            </>
          ) : (
            <Typography sx={{ textAlign: "center", p: 2 }}>Your cart is empty</Typography>
          )}
        </Box>
      </Menu>
    </div>
  );
}
