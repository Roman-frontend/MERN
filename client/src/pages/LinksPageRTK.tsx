import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { postAPI } from "../services/LinkService";
import { LinksList } from "../components/LinksList";

export const LinksPageRTK = () => {
  const { token } = useContext(AuthContext);
  const [limit, setLimit] = useState<string | number | null>(3);
  const {
    data: links,
    error,
    isLoading: getLoading,
  } = postAPI.useFetchAllPostsQuery({ limit: null, token });

  const {
    data: limitedLinks,
    error: limitedError,
    isLoading: limitedGetLoading,
  } = postAPI.useFetchAllPostsQuery({ limit, token });

  const [createLink, { isLoading: loadingCreate }] =
    postAPI.useCreateLinkMutation();
  const [deleteLink, {}] = postAPI.useDeleteLinkMutation();
  const [updatePost, {}] = postAPI.useUpdateLinkMutation();

  const handleCreateRTK = async () => {
    try {
      const from = prompt("Введите имя");
      await createLink({ from, token });
    } catch (e) {
      console.log("error in RTK createLink... ", e);
    }
  };

  const handleChangeLimit = () => {
    const promptLimit: string | null = prompt("Input limit");
    setLimit(promptLimit);
  };

  const handleRemoveRTK = (id: string) => {
    deleteLink({ token, id });
  };

  const handleUpdate = (id: string) => {
    const name = prompt("Input name for change with RTK");
    updatePost({ name, token, id });
  };

  if (loadingCreate) {
    return <Loader />;
  }

  return (
    <>
      {error && typeof error === "string" && <h2>{error}</h2>}
      {limitedError && typeof limitedError === "string" && (
        <h2>{limitedError}</h2>
      )}
      <div style={{ display: "flex" }}>
        <div style={{ margin: "0px 10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Unlimited links</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                height: 25,
                width: "90%",
                backgroundColor: "lightblue",
              }}
              onClick={handleCreateRTK}
            >
              Create new with RTK
            </button>
          </div>
          {getLoading ? (
            <h3>Идет загрузка...</h3>
          ) : (
            <LinksList
              links={links}
              handleUpdate={handleUpdate}
              handleRemove={handleRemoveRTK}
            />
          )}
        </div>
        <div style={{ margin: "0px 10px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Limited links</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{
                height: 25,
                width: "90%",
                margin: "auto",
                backgroundColor: "orange",
                border: "none",
                color: "white",
              }}
              onClick={handleChangeLimit}
            >
              Change limit
            </button>
          </div>
          {limitedGetLoading ? (
            <h3>Идет загрузка...</h3>
          ) : (
            <LinksList
              links={limitedLinks}
              handleUpdate={handleUpdate}
              handleRemove={handleRemoveRTK}
            />
          )}
        </div>
      </div>
    </>
  );
};
