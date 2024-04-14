import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom";
// import axios from "axios";

const Singin = () => {
  const [valueSignup, setValueSignup] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const res = await fetch("http://localhost:5000/api/auth/signin", {
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
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
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
        <button type="button" className="btnOfGoogle">
          CONTINUE WITH GOOGLE
        </button>
      </form>
      <div className="d-flex p-4 ">
        <div>Don't Have an account ?..</div>
        <Link to="/signup">. Sign Up</Link>
      </div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error && " Somethings Went Wrong"}
        </div>
      )}
    </>
  );
};

export default Singin;
