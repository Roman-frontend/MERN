import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { ILink } from "../models/ILinkReducer";

export const LinksPageFetch = () => {
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [links, setLinks] = useState<ILink[]>([]);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetched);
    } catch (e) {
      console.log("fetch error... ", e);
    }
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleCreate = async () => {
    try {
      const from = prompt("Input link name for fetch");
      const newLink = await request(
        "/api/link/generate",
        "POST",
        { from },
        { Authorization: `Bearer ${token}` }
      );

      setLinks((prev) => prev.concat(newLink.link));
    } catch (e) {
      console.log("error in createLink... ", e);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const from = prompt("Input changed name for fetch");
      await request(
        `/api/link/${id}`,
        "PUT",
        { from },
        { Authorization: `Bearer ${token}` }
      );

      setLinks((prev: ILink[]) => {
        return prev.map((link) => {
          if (link._id === id && typeof from === "string") {
            return { ...link, from };
          }
          return link;
        });
      });
    } catch (e) {
      console.log("error in createLink... ", e);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await request(`/api/link/${id}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });

      setLinks((prev) =>
        prev.filter((link) => {
          return link._id !== id;
        })
      );
    } catch (e) {
      console.log("error in createLink... ", e);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!loading && (
        <LinksList
          links={links}
          handleUpdate={handleUpdate}
          handleRemove={handleRemove}
        />
      )}{" "}
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
};
