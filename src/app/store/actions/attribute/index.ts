import {
  addAttributesService,
  deleteAttributeService,
  getAttributesService,
  updateAttributeService,
} from "@/app/services/attributeService";
import { Attribute, AttributeType } from "@/app/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Actions

/** fetch attributes */
export const fetchAttributes = createAsyncThunk("attributes/fetchAttributes", async () => {
  return await getAttributesService();
});

/** add attribute */
export const addAttribute = createAsyncThunk(
  "attributes/addAttribute",
  async (attribute: Attribute) => {
    return await addAttributesService(attribute);
  },
);

/** update attribute */
export const updateAttribute = createAsyncThunk(
  "attributes/updateAttribute",
  async (attribute: AttributeType) => {
    return await updateAttributeService(attribute);
  },
);

/** delete attribute */
export const deleteAttribute = createAsyncThunk(
  "attributes/deleteAttribute",
  async (_id: string) => {
    return await deleteAttributeService(_id);
  },
);
