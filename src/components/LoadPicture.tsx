import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { Send } from "../pages/AddRecipePage";

export const LoadPicture = ({ ...props }) => {
  const { loadPic } = props;
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("https://i.postimg.cc/RCw7bJXr/logo.png  ");

  const formHandler = (e: any) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
    loadPic(url);
    // setValue("imageUrl", url);
  };

  const uploadFiles = (file: any) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);
          loadPic(url);
        });
      },
    );
  };
  console.log(url);

  return (
    <div>
      <div>
        <img src={url} alt="" style={{ maxWidth: "400px", minHeight: "200px" }} />
      </div>
      <form onSubmit={formHandler} style={{ marginTop: "30px" }}>
        <input type="file" className="input" />
        <Send type="submit">Upload</Send>
      </form>
    </div>
  );
};
