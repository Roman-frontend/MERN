import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Redux";
import "materialize-css";

interface IContext {
  token: null | string;
  userId: null | string;
  login: (jwtToken: string, id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated: boolean = !!token;
  const routes = useRoutes(isAuthenticated);
  const contextValue: IContext = {
    token,
    login,
    logout,
    userId,
    isAuthenticated,
  };

  if (!ready) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={contextValue}>
        <Router>
          {isAuthenticated && <Navbar />}
          <div style={{ width: "95%" }} className="container">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
}

export default App;
