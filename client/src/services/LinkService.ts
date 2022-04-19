import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ILink } from "../models/ILinkReducer";
import {
  IDeleteArgs,
  ICreateArgs,
  IQueryParams,
  IUpdateArgs,
} from "../models/ILinkService";

export const postAPI = createApi({
  // Унікальний ключ що буде однозначно оприділяти поточний сервіс
  reducerPath: "postAPI",
  //Базовий url на який наш сервіс буде відправляти запити
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5002" }),
  // Додаємо масив тегів, з елементами яких будуть працювати endpoints
  tagTypes: ["Link"],
  //Тут записуємо наші енд поінти і якось змінюємо наш стан
  endpoints: (build) => ({
    // fetchAllPosts - назва методу з допомогою якого ми отримувати чи змінюватимо якісь дані
    // build містить в собі методи (query, mutation) що дозволяють отримати результат виклику
    // query призначений щоб отримувати якісь дані від серверу.
    // ILink[] - те що повертатиме нам цей хук
    // number - тип аргументу що очікуватиме наш хук можна вказати як 2гий аргумент
    fetchAllPosts: build.query<ILink[], IQueryParams>({
      // query приймає аргументи що необхідні для запиту
      query: ({ limit, token }) => ({
        // цей url буде приплюсовуватись до базового
        url: `api/link?limit=${limit}`,
        // params: {
        //   _limit: limit,
        // },
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
      }),
      // providesTags - сюди вказуємо за яким тегом слідкувати і якщо в якомусь endpoint цей тег (тут Link) було присвоєно свойству invalidatesTags (так invalidatesTags: ["Link"]) і endpoint з цим сфойством спрацює то зміни відобразяться викликавши endpoint в кому є свойству providesTags присвоєно цей тег
      providesTags: (result) => ["Link"],
    }),
    //mutation - призначений щоб змінювати дані серверу це може бути POST чи PUT запити
    createLink: build.mutation<ILink, ICreateArgs>({
      query: ({ from, token }) => ({
        url: `api/link/generate`,
        headers: {
          ["authorization"]: `Bearer ${token}`,
        },
        method: "POST",
        body: { from },
      }),
      // Тут вказуємо що endpoint createPost працює з тегом Link і присвоївши значення Link свойству invalidatesTags - так показуємо що цей endpoint забезпочує дані для цього тегу
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
