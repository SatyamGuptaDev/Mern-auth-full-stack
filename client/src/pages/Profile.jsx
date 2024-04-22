import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-7 text-black">Profile</h1>

      <form>
        <div className="flex flex-col items-center">
          <label>Name</label>
          <input
            type="text"
            value={user ? user.name : ""}
            disabled={!user}
            className="border p-2 my-2"
          />
          <label>Username</label>
          <input
            type="text"
            value={user ? user.username : ""}
            disabled={!user}
            className="border p-2 my-2"
          />
          <label>Email</label>
          <input
            type="email"
            value={user ? user.email : ""}
            disabled={!user}
            className="border p-2 my-2"
          />
        </div>
      </form>
    </>
  );
};

export default Profile;
