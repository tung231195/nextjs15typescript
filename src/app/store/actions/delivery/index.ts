import {
  addDeliveryMethodsService,
  deleteDeliveryMethodService,
  getDeliveryMethodsService,
  updateDeliveryMethodService,
} from "@/app/services/deliveryService";
import { DeliveryMethod, DeliveryMethodType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch deliverys */
export const fetchDeliveryMethods = createAsyncThunk("deliverys/fetchDeliveryMethods", async () => {
  return await getDeliveryMethodsService();
});

/** add delivery */
export const addDeliveryMethod = createAsyncThunk(
  "deliverys/addDeliveryMethod",
  async (delivery: DeliveryMethod) => {
    return await addDeliveryMethodsService(delivery);
  },
);

/** update delivery */
export const updateDeliveryMethod = createAsyncThunk(
  "deliverys/updateDeliveryMethod",
  async (delivery: DeliveryMethodType) => {
    return await updateDeliveryMethodService(delivery);
  },
);

/** delete delivery */
export const deleteDeliveryMethod = createAsyncThunk(
  "deliverys/deleteDeliveryMethod",
  async (_id: string) => {
    return await deleteDeliveryMethodService(_id);
  },
);
