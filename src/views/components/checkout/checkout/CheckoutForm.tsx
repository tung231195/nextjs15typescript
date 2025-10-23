"use client";

import useCart from "@/app/hooks/useCart";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ShippingAddress from "./ShippingAddress";
import ProductItems from "./ProductItems";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import CustomModal from "@/app/components/custom/CustomModal";
import AddressModal from "../address/AddressModal";
import AddressForm from "../address/AddressForm";
import { AddressType, DeliveryMethodType, PaymentMethodType } from "@/app/types";
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
  const [showShippingMethod, setShowShippingMethod] = useState<boolean>(false);
  const [shippingMethod, setShippingMethod] = useState<DeliveryMethodType>();
  const [showPaymentMethod, setShowPaymentMethod] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
  const [listAddress, setListAddress] = useState<AddressType[]>([]);
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
    console.log(shippingMethod);
  };

  const handleConfirmShippingMethod = () => {
    setShipping(
      shippingMethod?.method ?? "ghn",
      shippingMethod?.shippingFee ?? 0, // ✅ mặc định 0 nếu undefined
    );
    setShowShippingMethod(false);
    console.log("Chọn phương thức vận chuyển");
  };
  const handlePaymentMethod = async (_id: string) => {
    await getPaymentMethodService(_id);
    setPaymentMethod(paymentMethod);
    setShowPaymentMethod(false);
  };

  const handleConfirmPaymentMethod = () => {
    setShipping(
      shippingMethod?.method ?? "ghn",
      shippingMethod?.shippingFee ?? 0, // ✅ mặc định 0 nếu undefined
    );
  };
  const handleProcessCheckout = () => {
    const orderItem = {
      items: cartItems,
      shippingAddress: {
        fullName: addressDefault.name,
        address: addressDefault.province,
        city: addressDefault.province,
        postalCode: addressDefault.postalCode,
        country: addressDefault.country,
      },
      paymentMethod: paymentMethod?.method ?? "cod",
      itemsPrice: subTotalPrice,
      shippingPrice: shippingMethod?.shippingFee ?? 0,
      taxPrice: 10,
      totalPrice: totalPrice,
    };
    // dispatch(orderAction(orderItem));
    console.log("checkout data", orderItem);
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
              <Typography>
                Nhấn Đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shopee
              </Typography>
            </Grid>
            <Grid size={{ md: 4 }} sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleProcessCheckout} variant="contained" size="large">
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
        />
      </CustomModal>
    </Box>
  );
};

export default CheckoutForm;
