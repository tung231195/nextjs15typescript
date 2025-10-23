import { AxiosError } from "axios";
import { PaymentMethodType, PaymentMethod } from "../types";
import customAxios from "../utils/customAxious";

/** get paymentMethods */
const getPaymentMethodsService = async () => {
  try {
    const paymentMethods = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/paymentmethod`,
    );
    return paymentMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get paymentMethod */
const getPaymentMethodService = async (id: string) => {
  try {
    const paymentMethods = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/paymentmethod/${id}`,
    );
    return paymentMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add paymentMethod */
const addPaymentMethodsService = async (data: PaymentMethod) => {
  try {
    const paymentMethods = await customAxios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/paymentmethod`,
      data,
    );
    return paymentMethods.data;
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

/** update paymentMethod */
const updatePaymentMethodService = async (data: PaymentMethodType) => {
  console.log("data update", data);
  try {
    const paymentMethods = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/paymentmethod/${data._id}`,
      data,
    );
    return paymentMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete paymentMethod */
const deletePaymentMethodService = async (_id: string) => {
  try {
    const paymentMethods = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/paymentmethod/${_id}`,
    );
    return paymentMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getPaymentMethodsService,
  addPaymentMethodsService,
  updatePaymentMethodService,
  deletePaymentMethodService,
  getPaymentMethodService,
};
