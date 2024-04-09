import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-300 mb-3 text-black w-full shadow-slate-200 shadow-lg">
      <div className="max-w-6xl mx-auto h-fit p-3 flex justify-between items-center align-middle">
        <h1 className="text-xl font-bold">Auth App</h1>
        <nav>
          <ul className="flex flex-wrap space-x-4">
            <li>
              <NavLink
                exact
                to="/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-blue-500"
                    : isActive
                    ? "text-orange-500 "
                    : "text-black"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-blue-500"
                    : isActive
                    ? "text-orange-500 "
                    : "text-black"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-blue-500"
                    : isActive
                    ? "text-orange-500 "
                    : "text-black"
                }
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-out"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-blue-500"
                    : isActive
                    ? "text-orange-500 "
                    : "text-black"
                }
              >
                Sign Out
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-blue-500"
                    : isActive
                    ? "text-orange-500 "
                    : "text-black"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
