import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ILink,
  IInitialState,
  ICreatePayload,
} from "../../models/ILinkReducer";
import { getLinks, createLink, updateLink, deleteLink } from "./ActionCreators";

const initialState: IInitialState = {
  status: "succeeded",
  error: "",
  links: [],
};

export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: {
    [getLinks.pending.type]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [getLinks.fulfilled.type]: (
      state: IInitialState,
      action: PayloadAction<ILink[]>
    ) => {
      state.status = "succeeded";
      state.error = "";
      state.links = action.payload;
    },
    [getLinks.rejected.type]: (
      state: IInitialState,
      action: PayloadAction<any>
    ) => {
      console.log("action... ", action.payload);
      state.status = "failed";
      state.error = action.payload.message;
    },
    [createLink.pending.type]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [createLink.fulfilled.type]: (
      state: IInitialState,
      action: PayloadAction<ICreatePayload>
    ) => {
      state.status = "succeeded";
      state.error = "";
      state.links.push(action.payload.link);
    },
    [createLink.rejected.type]: (
      state: IInitialState,
      action: PayloadAction<any>
    ) => {
      console.log("action... ", action.payload);
      state.status = "failed";
      state.error = action.payload.message;
    },
    [deleteLink.pending.type]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [deleteLink.fulfilled.type]: (
      state: IInitialState,
      action: PayloadAction<string>
    ) => {
      state.status = "succeeded";
      state.error = "";
      state.links = state.links.filter((link) => {
        console.log(action.payload);
        return link._id !== action.payload;
      });
    },
    [deleteLink.rejected.type]: (
      state: IInitialState,
      action: PayloadAction<any>
    ) => {
      console.log("action... ", action.payload);
      state.status = "failed";
      state.error = action.payload.message;
    },
    [updateLink.pending.type]: (state, action) => {
      state.status = "loading";
      state.error = "";
    },
    [updateLink.fulfilled.type]: (
      state: IInitialState,
      action: PayloadAction<{ id: string; from: string }>
    ) => {
      state.status = "succeeded";
      state.error = "";
      state.links = state.links.map((link) => {
        return link._id === action.payload.id
          ? { ...link, from: action.payload.from }
          : link;
      });
    },
    [updateLink.rejected.type]: (
      state: IInitialState,
      action: PayloadAction<any>
    ) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default linkSlice.reducer;
