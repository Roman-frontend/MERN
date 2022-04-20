import React, { useState, useEffect } from "react";
import axios from "axios";
import { ILink } from "../models/ILinkReducer";
import { LinksList } from "../components/LinksList";

interface IJsonServerLink extends ILink {
  id?: string;
}

export function LinksPageJsonServer() {
  const [links, setLinks] = useState<IJsonServerLink[]>([]);

  useEffect(() => {
    function load() {
      axios
        .get("http://localhost:4200/links")
        .then((res) => {
          console.log("response... ", res);
          setLinks(res.data);
        })
        .catch((error) => console.log("Some error... ", error));
    }

    load();
  }, []);

  const handleCreate = () => {
    console.log("handleCreate... ");

    const from = prompt("Input name");
    const id = Math.random().toString();

    const data = {
      clicks: 0,
      code: "fLOaMNWNH",
      date: "2022-04-19T14:03:02.058Z",
      from,
      owner: "625de078bcf9d26ee78895e8",
      to: "http://localhost:5002/t/fLOaMNWNH",
      __v: 0,
      _id: id,
      id,
    };

    axios
      .post("http://localhost:4200/links", data)
      .then((res) => {
        console.log("response... ", res);
        setLinks((prev) => prev.concat(res.data));
      })
      .catch((error) => console.log("Some error... ", error));
  };

  const handleUpdate = async (id: string) => {
    console.log("handleUpdate... ");
    const from = prompt("Input name");
    const linkUpdate = links.filter((link) => link._id === id);

    axios
      .put(`http://localhost:4200/links/${id}`, { ...linkUpdate[0], from })
      .then((res) => {
        console.log("response... ", res);
        setLinks((prev) => {
          return prev.map((link) => {
            if (link._id === id) {
              return res.data;
            }
            return link;
          });
        });
      })
      .catch((error) => console.log("Some error... ", error));
  };

  const handleRemove = async (id: string) => {
    console.log("handleRemove... ");

    axios
      .delete(`http://localhost:4200/links/${id}`)
      .then((res) => {
        console.log("response... ", res);
        setLinks((prev) => prev.filter((link) => link._id !== id));
      })
      .catch((error) => console.log("Some error... ", error));
  };

  if (!links[0]) {
    return (
      <>
        <h1>links Page</h1>
        <hr />
        <h2>Loading posts...</h2>
      </>
    );
  }

  return (
    <>
      <LinksList
        links={links}
        handleUpdate={handleUpdate}
        handleRemove={handleRemove}
      />
      <button
        style={{
          width: "100%",
          height: 35,
          border: "none",
          backgroundColor: "#1E88E5",
          color: "white",
          marginTop: 15,
          cursor: "pointer",
        }}
        onClick={handleCreate}
      >
        Create
      </button>
    </>
  );
}
