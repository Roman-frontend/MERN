import React, { MouseEvent, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { pathname } = useLocation();

  const logoutHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    auth.logout();
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li
            style={{
              backgroundColor: pathname === "/create" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li
            style={{
              backgroundColor: pathname === "/file" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/file">Загрузить файл</NavLink>
          </li>
          <li
            style={{
              backgroundColor: pathname === "/links/fetch" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/links/fetch">Fetch</NavLink>
          </li>
          <li
            style={{
              backgroundColor:
                pathname === "/links/create-async-thunk" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/links/create-async-thunk">Create async thunk</NavLink>
          </li>
          <li
            style={{
              backgroundColor: pathname === "/links/RTK" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/links/RTK">RTK</NavLink>
          </li>
          <li
            style={{
              backgroundColor:
                pathname === "/links/json-server" ? "blue" : "#1E88E5",
            }}
          >
            <NavLink to="/links/json-server">json-server</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
