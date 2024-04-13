import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";

const Singup = () => {
  const [valueSignup, setValueSignup] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // creating an object to post it in mongo DB
  const handelsignvalue = (e) => {
    setValueSignup({ ...valueSignup, [e.target.id]: e.target.value });
  };

  const handelSubmite = async (e) => {
    e.preventDefault();

    /////////////////////////////////////////////////
    try {
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valueSignup),
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    /////////////////////////////////////////////////
    //   try {
    //     setLoading(true);
    //     await axios.post("http://localhost:5000/api/user/signup", valueSignup);
    //     setLoading(false);
    //     setError(false);
    //     alert("User created successful");
    //   } catch (error) {
    //     setLoading(false);
    //     setError(false);
    //     alert("Somthing went wrong or maybe Username or Email unavilabel");
    //   }
  };

  return (
    <>
      <h3>Sing Up</h3>
      <form onSubmit={handelSubmite}>
        <input
          id="username"
          type="text"
          placeholder="Username"
          onChange={handelsignvalue}
        />
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
        <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        <button type="button" className="btnOfGoogle">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="d-flex p-4 ">
        <div>Have an account ?..</div>
        <Link to="/signin">. Sign In</Link>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error && " Somethings Went Wrong"}
        </div>
      )}
    </>
  );
};

export default Singup;
