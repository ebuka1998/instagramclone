import React from "react";

const MiniProfileCard = ({username, profile_image}) => {
  return (
    <div className="flex mt-6">
      <img
        className="inline object-cover w-16 h-16 rounded-full"
        src={profile_image}
        alt="Profile"
      />
      <h3 className="ml-6 mt-3">{username}</h3>
    </div>
  );
};

export default MiniProfileCard;
