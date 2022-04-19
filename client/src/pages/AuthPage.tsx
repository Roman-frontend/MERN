import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

interface IFormState {
  email: string;
  password: string;
}

export const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState<IFormState>({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    (window as any).M.updateTextFields();
  }, []);

  useEffect(() => {
    if (form && form.email.length >= 6 && form.password.length >= 6) {
      setDisabled(false);
    }
  }, [form]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {
      console.log("error AuthPage ... ", e);
    }
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card blue darken-1">
          <form>
            <div className="card-content white-text">
              <span className="card-title">Авторизация</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Введите email"
                    id="email"
                    type="text"
                    name="email"
                    className="yellow-input"
                    value={form.email}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите пароль"
                    id="password"
                    type="password"
                    name="password"
                    className="yellow-input"
                    value={form.password}
                    onChange={changeHandler}
                  />
                  <label htmlFor="email">Пароль</label>
                </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn yellow darken-4"
                style={{ marginRight: 10 }}
                disabled={loading || disabled}
                onClick={loginHandler}
                type="submit"
              >
                Войти
              </button>
              <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading || disabled}
              >
                Регистрация
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
