import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div className="text-center font-sans text-blue-500 bg-white min-h-screen flex flex-col">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Route path="/" element={<Profile />} />
              </PrivateRoute>
            }
          />
        </Routes>

        
      </Router>
    </div>
  );
};

export default App;
