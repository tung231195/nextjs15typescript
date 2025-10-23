import { AxiosError } from "axios";
import { Address, AddressType } from "../types";
import customAxios from "../utils/customAxious";

/** get all addresses */
const getAddressesService = async () => {
  try {
    const addresses = await customAxios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/address`);
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
  //return login;
};

/** get address */
const getAddressService = async (id: string) => {
  try {
    const addresses = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/addresses/${id}`,
    );
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** get address default */
const getAddressDefaultService = async () => {
  try {
    const addresses = await customAxios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/address/default`,
    );
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }

  //return login;
};

/** add address */
const addAddressesService = async (data: Address) => {
  try {
    const addresses = await customAxios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/address`, data);
    return addresses.data;
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

/** update address */
const updateAddressService = async (data: AddressType) => {
  console.log("data update", data);
  try {
    const addresses = await customAxios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/address/${data._id}`,
      data,
    );
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** update address */
const setAddressDefaultService = async (data: AddressType) => {
  console.log("data update", data);
  try {
    const addresses = await customAxios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/address/update/all`,
      data,
    );
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
/** delete address */
const deleteAddressService = async (_id: string) => {
  try {
    const addresses = await customAxios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/addresses/${_id}`,
    );
    return addresses.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  getAddressesService,
  addAddressesService,
  updateAddressService,
  deleteAddressService,
  getAddressService,
  getAddressDefaultService,
  setAddressDefaultService,
};
