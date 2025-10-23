import { AxiosError } from "axios";
import { DeliveryMethodType, DeliveryMethod } from "../types";
import customAxios from "../utils/customAxious";

/** get deliveryMethods */
const getDeliveryMethodsService = async () => {
  try {
    const deliveryMethods = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/delivery`);
    return deliveryMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get deliveryMethod */
const getDeliveryMethodService = async (id: string) => {
  try {
    const deliveryMethods = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery/${id}`,
    );
    return deliveryMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add deliveryMethod */
const addDeliveryMethodsService = async (data: DeliveryMethod) => {
  try {
    const deliveryMethods = await customAxios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery`,
      data,
    );
    return deliveryMethods.data;
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

/** update deliveryMethod */
const updateDeliveryMethodService = async (data: DeliveryMethodType) => {
  console.log("data update", data);
  try {
    const deliveryMethods = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery/${data._id}`,
      data,
    );
    return deliveryMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete deliveryMethod */
const deleteDeliveryMethodService = async (_id: string) => {
  try {
    const deliveryMethods = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/delivery/${_id}`,
    );
    return deliveryMethods.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getDeliveryMethodsService,
  addDeliveryMethodsService,
  updateDeliveryMethodService,
  deleteDeliveryMethodService,
  getDeliveryMethodService,
};
