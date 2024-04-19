import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux-rtk/slices/user-slice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth";

// import { Link } from "react-router-dom";
// import axios from "axios";

const Singin = () => {
  const [valueSignup, setValueSignup] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // creating an object to post it in mongo DB
  const handelsignvalue = (e) => {
    setValueSignup({ ...valueSignup, [e.target.id]: e.target.value });
  };

  const handelSubmite = async (e) => {
    e.preventDefault();

    /////////////////////////////////////////////////
    try {
      // setLoading(true);
      // setError(false);
      dispatch(signInStart());
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valueSignup),
      });
      const data = await res.json();

      // setLoading(false);

      if (data.success === false) {
        // setError(true);
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      // setLoading(false);
      // setError(true);
      dispatch(signInFailure(error));
    }
  };

  return (
    <>
      <h3>Sing In</h3>
      <form onSubmit={handelSubmite}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          onChange={handelsignvalue}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={handelsignvalue}
        />
        <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        {/* <button type="button" className="btnOfGoogle"> */}
        <OAuth />
        {/* </button> */}
      </form>
      <div className="d-flex p-4 ">
        <div>Don't Have an account ?..</div>
        <Link to="/signup">. Sign Up</Link>
      </div>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error.message || " Somethings Went Wrong"}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Singin;
