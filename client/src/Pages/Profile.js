import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser } = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        );
      }
    );
  };

  return (
    <>
      <div className="container proCont">
        <h1>Profile</h1>
        <h2>Hello {currentUser.username}</h2>
        <form>
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          {/*
     firebase storage rules 
     allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches("image/.*") */}
          <img
            src={formData.profilePic || currentUser.profilePic}
            alt="proPicture"
            className="picProfile"
            onClick={() => fileRef.current.click()}
          />

          <div className="text-sm self-center">
            {imageError ? (
              <span className="text-danger">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-secondary">{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-success">Image uploaded successfully</span>
            ) : (
              ""
            )}
          </div>

          <input
            type="text"
            placeholder="Username"
            id="Username"
            defaultValue={currentUser.username}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
          />
          <input type="password" placeholder="Password" id="password" />
          <button type="button">Update</button>
        </form>
        <div className="conOfDeleteandLogout">
          <span>Delete Account</span>
          <span>Log Out</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
