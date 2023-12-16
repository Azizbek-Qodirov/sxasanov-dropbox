import React, { useState } from "react";
import Uploadstyle from "./FileUpload.module.css";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newFileObject = {
      name: selectedFile.name,
      file: selectedFile,
      link: null,
    };

    setUploadedFiles([...uploadedFiles, newFileObject]);
    setSelectedFile(null);
  };


  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  const handleShow = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  };

  const handleDelete = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  const handleGenerateLink = (file, index) => {
    const url = URL.createObjectURL(file);
  
    const updatedFiles = uploadedFiles.map((obj, i) =>
      i === index ? { ...obj, link: url } : obj
    );
  
    setUploadedFiles(updatedFiles);
  };


  

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    const newFolder = {
      name: folderName,
      files: [],
    };

    setFolders([...folders, newFolder]);
  };

  const handleUploadToFolder = () => {
    const fileName = prompt("Enter file name:");
    if (!fileName) return;

    const fileObjectIndex = uploadedFiles.findIndex(
      (fileObj) => fileObj.name === fileName
    );
    if (fileObjectIndex === -1) {
      alert("File not found in the uploaded files.");
      return;
    }

    const selectedFileObject = uploadedFiles[fileObjectIndex];

    const folderName = prompt("Enter folder name to move the file:");
    if (!folderName) return;

    const folderIndex = folders.findIndex(
      (folder) => folder.name === folderName
    );
    if (folderIndex === -1) {
      alert("Folder not found.");
      return;
    }

    const updatedFolders = [...folders];
    updatedFolders[folderIndex].files.push(selectedFileObject);
    setFolders(updatedFolders);

    const updatedFiles = uploadedFiles.filter((_, i) => i !== fileObjectIndex);
    setUploadedFiles(updatedFiles);
  };

  const handleDeleteFromFolder = (folderIndex, fileIndex) => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].files.splice(fileIndex, 1);
    setFolders(updatedFolders);
  };

  const handleDeleteFolder = (folderIndex) => {
    const updatedFolders = folders.filter((_, i) => i !== folderIndex);
    setFolders(updatedFolders);
  };
  return (
    <div className={Uploadstyle.body}>
      <div className={Uploadstyle.Box}>
        <h2>File Upload</h2>
        <input
          className={Uploadstyle.Uploadchoose}
          type="file"
          onChange={handleFileChange}
        />
        <button className={Uploadstyle.Uploadside} onClick={handleUpload}>
          Upload
        </button>

        {uploadedFiles.length > 0 && (
          <div className={Uploadstyle.Uploadedfiles}>
            <h3>Uploaded Files:</h3>
            {uploadedFiles.map((fileObject, index) => (
              <div key={index} className={Uploadstyle.fileContainer}>
                <h3>
                  <i className="fa-solid fa-file ikon"></i>
                  {fileObject.name}
                </h3>
                <div>
                  <button
                    className={Uploadstyle.Filebutton}
                    onClick={() => handleDownload(fileObject.file)}
                  >
                    Download
                  </button>
                  <button
                    className={Uploadstyle.Filebutton}
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <button
                    className={Uploadstyle.Filebutton}
                    onClick={() => handleShow(fileObject.file)}
                  >
                    Show
                  </button>
                  <button
                    className={Uploadstyle.Filebutton}
                    onClick={() => handleGenerateLink(fileObject.file, index)}
                  >
                    Link
                  </button>
                  {fileObject.link && (
                    <p className={Uploadstyle.link}>
                      Link:{" "}
                      <a
                        href={fileObject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {fileObject.link}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={Uploadstyle.createFolder}>
        <button className={Uploadstyle.Filebutton} onClick={handleCreateFolder}>
          Create folder
        </button>
      </div>

      {folders.map((folder, folderIndex) => (
        <div key={folderIndex} className={Uploadstyle.folder}>
          <div className={Uploadstyle.createdFoldersStyle}>
            <h3 className={Uploadstyle.myFolderName}>{folder.name}</h3>
            <button
              className={Uploadstyle.Filebutton}
              onClick={handleUploadToFolder}
            >
              Upload to folder
            </button>
            <button
              className={Uploadstyle.Filebutton}
              onClick={() => handleDeleteFolder(folderIndex)}
            >
              Delete Folder
            </button>
            {folder.files.map((fileObject, fileIndex) => (
              <div key={fileIndex} className={Uploadstyle.folderFile}>
                <h3>
                  <i className="fa-solid fa-file ikon"></i>
                  {fileObject.name}
                </h3>
                <button
                  className={Uploadstyle.Filebutton}
                  onClick={() => handleDeleteFromFolder(folderIndex, fileIndex)}
                >
                  Delete
                </button>
                {fileObject.link && (
                  <p className={Uploadstyle.link}>
                    Link:{" "}
                    <a
                      href={fileObject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {fileObject.link}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploadComponent;
