import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILink } from "../../models/ILinkReducer";
import {
  ICreateArgs,
  IUpdateArgs,
  IDeleteArgs,
} from "../../models/IActionCreators";

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (params: { token: string | null }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5002/api/link", {
        method: "GET",
        body: null,
        headers: {
          ["authorization"]: `Bearer ${params.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data: ILink[] = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async ({ token, from }: ICreateArgs, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5002/api/link/generate", {
        method: "POST",
        body: JSON.stringify({ from }),
        headers: {
          ["authorization"]: `Bearer ${token}`,
          ["Content-Type"]: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      const data: ILink = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async ({ token, id, from }: IUpdateArgs, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5002/api/link/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: from }),
        headers: {
          ["authorization"]: `Bearer ${token}`,
          ["Content-Type"]: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      return { id, from };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async ({ token, id }: IDeleteArgs, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5002/api/link/${id}`, {
        method: "DELETE",
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Server Error!");
      }

      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
