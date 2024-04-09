import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" pt-10 mt-6 text-black max-w-2xl mx-auto flex flex-col font-sans   w-full h-full">

      <h1 className="font-semibold text-3xl text-left" >Welcome to My MERN Auth App!</h1>

      <h5 className=" font-light text-md mt-5 text-left ">
        This is a full-stack web application built with the MERN (MongoDB,
        Express, React, Node.js) stack. It includes authentication features that
        allow users to sign up, log in, and log out, and provides access to
        protected routes only for authenticated users. <br/><br/>
         
        The front-end of the
        application is built with React and uses React Router for client-side
        routing. The back-end is built with Node.js and Express, and uses
        MongoDB as the database. Authentication is implemented using JSON Web
        Tokens (JWT).<br/><br/> This application is intended as a starting point for
        building full-stack web applications with authentication using the MERN
        stack. Feel free to use it as a template for your own projects!
      </h5>
    </div>
  );
};

export default Home;
