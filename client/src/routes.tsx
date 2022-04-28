import React from "react";
import { Routes, Route } from "react-router-dom";
import { LinksPageFetch } from "./pages/LinksPageFetch";
import { LinksPageCreateAsyncThunk } from "./pages/LinksPageCreateAsyncThunk";
import { LinksPageRTK } from "./pages/LinksPageRTK";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { LinksPageJsonServer } from "./pages/LinksPageJsonServer";
import { AuthPage } from "./pages/AuthPage";
import FileUpload from "./pages/FileUpload";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/file" element={<FileUpload />} />
        <Route path="/links/fetch" element={<LinksPageFetch />} />
        <Route
          path="/links/create-async-thunk"
          element={<LinksPageCreateAsyncThunk />}
        />
        <Route path="/links/RTK" element={<LinksPageRTK />} />
        <Route path="/links/json-server" element={<LinksPageJsonServer />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<CreatePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/*" element={<AuthPage />} />
    </Routes>
  );
};
