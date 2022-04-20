import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ILink } from "../models/ILinkReducer";
import {
  IDeleteArgs,
  ICreateArgs,
  IQueryParams,
  IUpdateArgs,
} from "../models/ILinkService";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5002" }),
  tagTypes: ["Link"],
  endpoints: (build) => ({
    fetchAllPosts: build.query<ILink[], IQueryParams>({
      query: ({ limit, token }) => ({
        url: `api/link?limit=${limit}`,
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
      }),
      providesTags: (result) => ["Link"],
    }),

    createLink: build.mutation<ILink, ICreateArgs>({
      query: ({ from, token }) => ({
        url: `api/link/generate`,
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
        method: "POST",
        body: { from },
      }),
      invalidatesTags: ["Link"],
    }),

    updateLink: build.mutation<ILink, IUpdateArgs>({
      query: ({ name, token, id }) => ({
        url: `api/link/${id}`,
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Link"],
    }),

    deleteLink: build.mutation<ILink, IDeleteArgs>({
      query: ({ id, token }) => ({
        url: `api/link/${id}`,
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["Link"],
    }),
  }),
});
