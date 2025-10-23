import { AxiosError } from "axios";
import { AttributeType, Attribute } from "../types";
import customAxios from "../utils/customAxious";

/** get attributes */
const getAttributesService = async () => {
  try {
    const attributes = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/attributes`);
    return attributes.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get attribute */
const getAttributeService = async (id: string) => {
  try {
    const attributes = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/attributes/${id}`,
    );
    return attributes.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add attribute */
const addAttributesService = async (data: Attribute) => {
  try {
    const attributes = await customAxios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/attributes`,
      data,
    );
    return attributes.data;
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

/** update attribute */
const updateAttributeService = async (data: AttributeType) => {
  console.log("data update", data);
  try {
    const attributes = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/attributes/${data._id}`,
      data,
    );
    return attributes.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete attribute */
const deleteAttributeService = async (_id: string) => {
  try {
    const attributes = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/attributes/${_id}`,
    );
    return attributes.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getAttributesService,
  addAttributesService,
  updateAttributeService,
  deleteAttributeService,
  getAttributeService,
};
