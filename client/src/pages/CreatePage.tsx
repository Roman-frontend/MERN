import React, { KeyboardEvent, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./CreatePage.css";

export const CreatePage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    (window as any).M.updateTextFields();
  }, []);

  const pressHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        //console.log(file);
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("data => ", data);
        navigate(`/detail/${data.link._id}`);
      } catch (e) {
        console.log("error in createLink... ", e);
      }
    }
  };

  return (
    <div className="row" style={{ display: "block" }}>
      <div className="col s8 offset-s2" style={{ padding: "2rem 0rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};
