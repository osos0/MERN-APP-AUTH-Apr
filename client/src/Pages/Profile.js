import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux-rtk/slices/user-slice";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(
        `http://localhost:5000/api/users/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(formData);
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `http://localhost:5000/api/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleLogOut = async () => {
    try {
      await fetch(`http://localhost:5000/api/auth/signout`);
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container proCont">
        <h1>Profile</h1>
        <h2>Hello {currentUser.username}</h2>
        <form onSubmit={handleSubmit}>
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
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            onChange={handelChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handelChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handelChange}
          />
          <button>{loading ? "loading ... " : "Update"}</button>
        </form>
        <div className="conOfDeleteandLogout">
          <span onClick={handleDeleteAccount}>Delete Account</span>
          <span onClick={handleLogOut}>Log Out</span>
        </div>
        <div className="text-danger mt-5">
          {error && "Something went wrong!"}
        </div>
        <div className="text-success mt-5">
          {updateSuccess && "User is updated successfully!"}
        </div>
      </div>
    </>
  );
};

export default Profile;
