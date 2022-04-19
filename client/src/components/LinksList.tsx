import React from "react";
import { Link } from "react-router-dom";
import { ILink } from "../models/ILinkReducer";

interface IProps {
  links: ILink[] | undefined;
  handleUpdate: (id: string) => void;
  handleRemove: (id: string) => void;
}

export const LinksList = ({ links, handleUpdate, handleRemove }: IProps) => {
  if (links && !links.length) {
    return <p className="center">Ссылок пока нет</p>;
  }

  return (
    <>
      <table style={{ borderLeft: "solid lightblue", marginTop: 30 }}>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Сокращенная</th>
            <th>Открыть</th>
            <th>Изменить</th>
            <th>Удалить</th>
          </tr>
        </thead>

        <tbody>
          {links &&
            links.map((link, index) => {
              return (
                <tr key={link._id}>
                  <td>{index + 1}</td>
                  <td>{link.from}</td>
                  <td>{link.to}</td>
                  <td>
                    <Link to={`/detail/${link._id}`}>Открыть</Link>
                  </td>
                  <td
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleUpdate(link._id)}
                  >
                    Изменить
                  </td>
                  <td
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleRemove(link._id)}
                  >
                    Удалить
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
