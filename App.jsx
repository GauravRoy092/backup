import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

// Define routes as a constant
const routes = (
  <Routes>
    <Route path="/dashboard" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      {routes} {/* Use the constant routes here */}
    </Router>
  );
};

export default App;
