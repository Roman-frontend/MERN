import React, { useState, ChangeEvent, FormEvent } from "react";
import Message from "../components/UploadFile/Message";
import Progress from "../components/UploadFile/Progress";
import axios from "axios";
import ListPictures from "../components/UploadFile/ListPictures";

interface IUploadedFile {
  fileName?: string;
  filePath?: string;
}

const FileUpload = () => {
  const [file, setFile] = useState<File | string>("");
  const [filename, setFilename] = useState<string>("Choose File");
  const [uploadedFile, setUploadedFile] = useState<IUploadedFile>({});
  const [message, setMessage] = useState<string>("");
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [showListPictures, setShowListPictures] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e && e.target.files) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    console.log("formData... ", formData);

    try {
      const res = await axios.post("/api/file/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },
      });

      setTimeout(() => setUploadPercentage(0), 10000);

      console.log("res.data => ", res.data);
      const { fileName, filePath } = res.data;

      setUploadedFile({
        fileName,
        filePath,
      });

      setMessage("File Uploaded");
    } catch (err: any) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }

    return false;
  };

  return (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react" />
      </h4>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      <button
        className="btn btn-primary btn-block mt-4"
        onClick={() => setShowListPictures(!showListPictures)}
      >
        {showListPictures ? "Hide list pictures" : "Show list pictures"}
      </button>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <img
              style={{ width: 140, height: "auto" }}
              src={uploadedFile.filePath}
              alt=""
            />
            <a href={uploadedFile.filePath}>{uploadedFile.fileName}</a>
          </div>
        </div>
      ) : null}
      {showListPictures && <ListPictures />}
    </div>
  );
};

export default FileUpload;
