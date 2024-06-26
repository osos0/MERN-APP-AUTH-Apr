import React from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Header from "./components/Header";
import About from "./Pages/About";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
