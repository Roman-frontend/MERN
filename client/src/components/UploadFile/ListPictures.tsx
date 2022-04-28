import React, {
  useState,
  ReactElement,
  useEffect,
  useCallback,
  memo,
} from "react";
import axios from "axios";
import "./AddAvatar.css";

interface IProps {}

interface IPicture {
  [name: string]: string;
}

const ListPictures = memo((props: IProps): ReactElement => {
  const [pictures, setPictures] = useState<IPicture[]>([]);

  useEffect(() => {
    (async function () {
      setPictures((prev) => []);
      const res = await axios.get("/api/file/getAll");
      if (res && Array.isArray(res.data)) {
        console.log(res.data);
        setPictures((prev) => res.data);
      }
    })();

    return () => {
      setPictures([]);
    };
  }, []);

  const handleRemoveImg = useCallback((id: string, url: string) => {
    try {
      const name = url.slice(22);
      axios
        .delete(`/api/file/${id}?name=${name}`)
        .then((res) => {
          console.log("res... ", res);
          document.getElementById(id)?.classList.add("removing");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log("error in handleRemoveImg => ", error);
    }
  }, []);

  const createImages = useCallback(() => {
    return pictures.map((p) => {
      return (
        <div className="preview-image" id={p._id} key={p._id}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleRemoveImg(p._id, p.picture)}
            onKeyDown={() => handleRemoveImg(p._id, p.picture)}
            className="preview-remove"
          >
            &times;
          </div>
          <img
            style={{ width: 140, height: "auto" }}
            alt={p.name}
            src={p.picture}
          />
          <a href={p.picture} style={{ textAlign: "center" }}>
            {p.name}
          </a>
        </div>
      );
    });
  }, [pictures, handleRemoveImg]);

  return <div className="preview">{createImages()}</div>;
});

export default ListPictures;
