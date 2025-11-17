import axios from "axios";
import { CustomerType } from "../types";
const getAllCustomers = async () => {
  try {
    const customers = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);

    return customers.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
const getUserById = async (id: string) => {
  try {
    const customer = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`);

    return customer.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};

const updateUserService = async ({
  customerId,
  data,
}: {
  customerId: string;
  data: CustomerType;
}) => {
  try {
    const customer = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${customerId}`,
      data,
    );
    return customer.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
const updateUserStatusService = async ({
  customerId,
  status,
}: {
  customerId: string;
  status: "enable" | "disabled";
}) => {
  try {
    const customer = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${customerId}/status`,
      {
        status,
      },
    );
    return customer.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export { getAllCustomers, updateUserStatusService, getUserById, updateUserService };
