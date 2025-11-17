import { AxiosError } from "axios";
import customAxios from "../utils/customAxious";
import { OrderItem } from "../types";
const getAllOrdertsService = async () => {
  try {
    const orders = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`);
    return orders.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get ordert */
const getOrdertService = async (id: string) => {
  try {
    const orders = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${id}`);
    return orders.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};
/** get ordert */
const getOrdertViews = async () => {
  try {
    const orders = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/overview`);
    return orders.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add ordert */
const addOrdertsService = async (data: OrderItem) => {
  try {
    const orders = await customAxios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`, data);
    return orders.data;
  } catch (e: unknown) {
    const error = e as AxiosError<{ message: string }>;
    if (error.response) {
      console.error("API error:", error.response.data?.message, "status:", error.response.status);
    } else {
      console.error("Unexpected error:", error.message);
    }
    throw error;
  }
};

// /** update ordert */
// const updateOrdertService = async (data: OrderItem) => {
//   try {
//     const orders = await customAxios.put(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${data._id}`,
//       data,
//     );
//     return orders.data;
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(e.message);
//     } else {
//       console.log("Unknown error", e);
//     }
//   }
// };
/** delete ordert */
const deleteOrdertService = async (_id: string) => {
  try {
    const orders = await customAxios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${_id}`);
    return orders.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};

// ✅ Cập nhật trạng thái đơn hàng
const updateOrderStatusService = async ({
  reference,
  status,
}: {
  reference: string;
  status: OrderItem["status"];
}) => {
  const { data } = await customAxios.put(`/orders/${reference}`, { status });
  return data;
};

export const paymentVNPAYService = async () => {
  const res = await customAxios.post("/payment/vnpay", {
    amount: 1000,
    orderId: Date.now(),
  });
  const data = await res.data;
  window.location.href = data.paymentUrl; // redirect sang trang thanh toán VNPAY
};

export const paymentStripePayment = async (orderItem: OrderItem) => {
  const res = await customAxios.post("/payment/stripe", {
    items: orderItem.items,
    userId: orderItem.user,
    shippingAddress: orderItem.shippingAddress,
  });
  window.location.href = res.data.url; // chuyển hướng tới Stripe
};

export const paymentCreateQR = async () => {
  const res = await customAxios.post("/payment/qrcode", {
    amount: 10000,
    orderId: Date.now(),
    bankAccount: "123456789",
    bankName: "VCB",
    content: "Thanh toan don hang 123",
  });
  return res ?? {};
};
export {
  getAllOrdertsService,
  addOrdertsService,
  // updateOrdertService,
  updateOrderStatusService,
  deleteOrdertService,
  getOrdertService,
  getOrdertViews,
};
