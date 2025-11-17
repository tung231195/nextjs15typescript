"use client";

import useCart from "@/app/hooks/useCart";
import { Box, Button, Checkbox, Divider, Grid, Paper, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import ShippingAddress from "./ShippingAddress";
import ProductItems from "./ProductItems";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import CustomModal from "@/app/components/custom/CustomModal";
import AddressModal from "../address/AddressModal";
import AddressForm from "../address/AddressForm";
import { AddressType, DeliveryMethodType, OrderItem, PaymentMethodType } from "@/app/types";
import {
  getAddressDefaultService,
  getAddressesService,
  setAddressDefaultService,
} from "@/app/services/addressService";
import ShippingMethodForm from "../shippingMethod/ShippingMethodForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchDeliveryMethods } from "@/app/store/actions/delivery";
import { getDeliveryMethodService } from "@/app/services/deliveryService";
import PaymentMethodForm from "../paymentMethod/PaymentMethodForm";
import { getPaymentMethodService } from "@/app/services/paymentMethodService";
import { fetchPaymentMethods } from "@/app/store/actions/payment";
import { orderAction } from "@/app/store/slices/cartSlice";
import { useAuthContext } from "@/app/context/AuthContext";
import toast from "react-hot-toast";
import {
  paymentCreateQR,
  paymentStripePayment,
  paymentVNPAYService,
} from "@/app/services/orderService";

const CheckoutForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shippingMethods = useSelector((state: RootState) => state.delivery.deliveryMethods);
  const paymentMethods = useSelector((state: RootState) => state.paymentMethod.paymentMethods);
  const { cartItems, setShipping, subTotalPrice, totalPrice } = useCart();
  const [showModalAddress, setShowModalAddres] = useState<boolean>(false);
  const [showAddressForm, setShowAddressForm] = useState<{ id: string; open: boolean }>({
    id: "",
    open: false,
  });
  const [isCheckout, setIsCheckout] = useState<boolean>(false);
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<DeliveryMethodType>();
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
  const [listAddress, setListAddress] = useState<AddressType[]>([]);
  const [qrcode, setQrCode] = useState<string>("");
  const [addressUpdate, setAddressUpdate] = useState<AddressType>({
    _id: "",
    name: "",
    country: "",
    phone: "",
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    isDefault: false,
  });
  const [addressDefault, setAddressDefault] = useState<AddressType>({
    _id: "",
    name: "",
    country: "",
    phone: "",
    province: { label: "", value: "" },
    district: { label: "", value: "" },
    ward: { label: "", value: "" },
    isDefault: false,
  });
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchListAddress = async () => {
      const listAdd = await getAddressesService();
      setListAddress(listAdd);
    };
    fetchListAddress();
  }, []);

  useEffect(() => {
    dispatch(fetchDeliveryMethods());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  useEffect(() => {
    const fetchAddressDefault = async () => {
      const addressDefault = await getAddressDefaultService();
      if (addressDefault) setAddressDefault(addressDefault);
    };
    fetchAddressDefault();
  }, []);

  /*** handle address */
  const hanldeChangeAddress = () => {
    setShowModalAddres(true);
  };
  const hanldeAddressForm = () => {
    setShowAddressForm({
      id: "",
      open: true,
    });
    setAddressUpdate({
      _id: "",
      name: "",
      phone: "",
      country: "",
      province: { label: "", value: "" },
      district: { label: "", value: "" },
      ward: { label: "", value: "" },
    });
  };
  const handleUpdateAddressForm = (_id: string) => {
    const addressUpdate = listAddress.length > 0 && listAddress.find((a) => a._id === _id);
    if (addressUpdate) {
      setAddressUpdate({ ...addressUpdate });
    }
    setShowAddressForm({ id: _id, open: true });
  };

  const hanldeDefault = (_id: string) => {
    const addressUpdate = listAddress.find((a) => a._id === _id);
    if (!addressUpdate) return;
    addressUpdate.isDefault = true;
    setAddressDefault(addressUpdate);
    const cloneListAddress = [...listAddress];
    setListAddress(
      cloneListAddress.map((a) => {
        return { ...a, isDefault: a._id === _id ? true : false };
      }),
    );
  };
  const hanldeConfirmAddressModal = async () => {
    await setAddressDefaultService(addressDefault);
    setShowModalAddres(false);
  };

  const handleChangeDelivery = () => {
    setShowShippingMethod(true);
  };

  const handleChangePaymentMethod = () => {
    setShowPaymentMethod(true);
  };
  const handleMethod = async (_id: string) => {
    const shippingMethod = await getDeliveryMethodService(_id);
    setShippingMethod(shippingMethod);
  };

  const handleConfirmShippingMethod = () => {
    setShipping(
      shippingMethod?.method ?? "ghn",
      shippingMethod?.shippingFee ?? 0, // ✅ mặc định 0 nếu undefined
    );
    setShowShippingMethod(false);
  };
  const handlePaymentMethod = async (_id: string) => {
    const paymentMethod = await getPaymentMethodService(_id);
    if (paymentMethod.method == "qrcode") {
      const qr = await paymentCreateQR();
      setQrCode(qr.data.qrImage ?? "");
    } else {
      setQrCode("");
    }
    setPaymentMethod(paymentMethod);
  };

  const handleConfirmPaymentMethod = () => {
    setShowPaymentMethod(false);
  };
  const handleProcessCheckout = async () => {
    try {
      if (!user) {
        toast.error("You need to login to checkout");
        return;
      }

      if (!paymentMethod) {
        toast.error("You need to choose a payment method");
        return;
      }

      if (!shippingMethod) {
        toast.error("You need to choose a shipping method");
        return;
      }

      const orderItem: OrderItem = {
        user: user?._id as string,
        items: cartItems,
        shippingAddress: {
          fullName: addressDefault.name,
          address: addressDefault.province?.label ?? "",
          city: addressDefault.province?.label ?? "",
          postalCode: addressDefault.postalCode as string,
          country: addressDefault.country,
        },
        paymentMethod: paymentMethod?.method ?? "cod",
        shippingMethod: shippingMethod?.method ?? "ghtk",
        itemsPrice: subTotalPrice as number,
        shippingPrice: shippingMethod?.shippingFee ?? 0,
        taxPrice: 10,
        totalPrice: totalPrice,
        status: "processing",
      };

      switch (paymentMethod.method) {
        case "cod":
          await dispatch(orderAction(orderItem));
          break;
        case "paypal":
          await paymentVNPAYService();
          break;
        case "stripe":
          await paymentStripePayment(orderItem);
          break;
        case "qrcode":
          await paymentStripePayment(orderItem);
          break;
        default:
          toast.error("Invalid payment method");
          break;
      }

      // ✅ check result
      toast.success("You have checked out successfully");
    } catch (err) {
      console.error("checkout error", err);
      toast.error("Something went wrong during checkout");
    }
  };
  const hanldeAgree = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckout(e.target.checked);
  };
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          p: { xs: 2, md: 3 },
        }}
      >
        <ShippingAddress
          hanldeChangeAddress={hanldeChangeAddress}
          addressDefault={addressDefault}
        />
        <Divider sx={{ m: "15px 0" }} />
        <ProductItems cartItems={cartItems} />
        <Divider sx={{ m: "15px 0" }} />
        <ShippingMethod
          shippingMethod={shippingMethod}
          handleChangeDelivery={() => handleChangeDelivery()}
        />
        <Divider sx={{ m: "15px 0" }} />
        <PaymentMethod
          paymentMethod={paymentMethod}
          handleChangePaymentMethod={() => handleChangePaymentMethod()}
          qrcode={qrcode}
        />
        <Divider sx={{ m: "15px 0" }} />
        <Box>
          <Grid container>
            <Grid size={{ md: 8 }}></Grid>
            <Grid size={{ md: 4 }}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                <Typography variant="body1">Sub Total </Typography>
                <Typography>{subTotalPrice}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
                <Typography variant="body1">Total</Typography>
                <Typography>{totalPrice}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ m: "15px 0" }} />
        <Box>
          <Grid container>
            <Grid size={{ md: 8 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Checkbox onChange={(e: ChangeEvent<HTMLInputElement>) => hanldeAgree(e)} />
                <Typography>
                  Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={!isCheckout}
                onClick={handleProcessCheckout}
                variant="contained"
                size="large"
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <CustomModal open={showModalAddress} handleClose={() => setShowModalAddres(false)}>
        <AddressModal
          handleUpdateAddressForm={(_id: string) => handleUpdateAddressForm(_id)}
          showAddressForm={hanldeAddressForm}
          listAddress={listAddress}
          hanldeDefault={(_id: string) => hanldeDefault(_id)}
          hanldeConfirmAddressModal={hanldeConfirmAddressModal}
        />
      </CustomModal>
      <CustomModal
        open={showAddressForm?.open}
        handleClose={() => setShowAddressForm({ id: "", open: false })}
      >
        <AddressForm
          showAddressForm={showAddressForm}
          addressUpdate={addressUpdate}
          setListAddress={setListAddress}
          handleClose={() => setShowAddressForm({ id: "", open: false })}
          setAddressDefault={setAddressDefault}
        />
      </CustomModal>

      <CustomModal open={showShippingMethod} handleClose={() => setShowShippingMethod(false)}>
        <ShippingMethodForm
          handleMethod={(_id: string) => handleMethod(_id)}
          handleConfirmShippingMethod={() => handleConfirmShippingMethod()}
          shippingMethods={shippingMethods}
          shippingMethod={shippingMethod}
        />
      </CustomModal>
      <CustomModal open={showPaymentMethod} handleClose={() => setShowPaymentMethod(false)}>
        <PaymentMethodForm
          handlePaymentMethod={(_id: string) => handlePaymentMethod(_id)}
          handleConfirmPaymentMethod={() => handleConfirmPaymentMethod()}
          paymentMethods={paymentMethods}
          paymentMethod={paymentMethod}
          qrcode={qrcode}
        />
      </CustomModal>
    </Box>
  );
};

export default CheckoutForm;
