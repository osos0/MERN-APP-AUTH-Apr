import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux-rtk/slices/user-slice.js";
// import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleGoogleClick = async () => {
    //   provider.setCustomParameters({ prompt: "select_account" });
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          Photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      //     if (res.ok) {
      dispatch(signInSuccess(data));
      //       navigate("/");
    } catch (error) {
      console.log("could not google connect");
      // console.log(error);
    }
  };

  return (
    <>
      <button type="button" className="gooleBtn" onClick={handleGoogleClick}>
        Continue With Google
      </button>
    </>
  );
}
