import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinksList } from "../components/LinksList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
} from "../Redux-toolkit/reducers/ActionCreators";

export const LinksPageCreateAsyncThunk = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const {
    links,
    error,
    status: linksLoading,
  } = useAppSelector((state) => state.linkReducer);

  useEffect(() => {
    dispatch(getLinks({ token }));
  }, []);

  const handleCreate = () => {
    const from = prompt("Input name of link");
    dispatch(createLink({ token, from }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteLink({ token, id }));
  };

  const handleUpdate = (id: string) => {
    const from = prompt("Input name for change");
    dispatch(updateLink({ token, id, from }));
  };

  console.log(links);

  if (linksLoading === "loading") {
    return <Loader />;
  }

  return (
    <>
      <LinksList
        links={links}
        handleUpdate={handleUpdate}
        handleRemove={handleDelete}
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
      {error && <h2>{error}</h2>}
    </>
  );
};
