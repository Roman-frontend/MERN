import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPageFetch } from "./pages/LinksPageFetch";
import { LinksPageCreateAsyncThunk } from "./pages/LinksPageCreateAsyncThunk";
import { LinksPageRTK } from "./pages/LinksPageRTK";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links/fetch" exact>
          <LinksPageFetch />
        </Route>
        <Route path="/links/create-async-thunk" exact>
          <LinksPageCreateAsyncThunk />
        </Route>
        <Route path="/links/RTK" exact>
          <LinksPageRTK />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
