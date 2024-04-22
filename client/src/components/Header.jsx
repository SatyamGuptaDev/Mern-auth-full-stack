import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";

function Header() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    return <Navigate to="/" />;
  }


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
            {
              !user ? (
                <>
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
                      to="/sign-up"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "text-blue-500"
                          : isActive
                          ? "text-orange-500 "
                          : "text-black"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              ) : ""
            }

            <li>
             {
              user ? (
                <button
                  onClick={handleLogout}
                  className="text-black"
                >
                  Logout
                </button>
              ) : ""
             }
            </li>


            <li>
              {user ? (
                <NavLink to="/profile">
                  <img
                    src={user.data.profilePicture}
                    alt="Profile"
                    className="w-7 h-7 rounded-full"
                  />
                </NavLink>
              ) : (
                ""
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
