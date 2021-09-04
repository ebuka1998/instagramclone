import React from "react";

const ProfileImage = ({ profile_picture }) => {
  return (
    <img
      className="object-cover lg:w-40 lg:h-40 w-24 h-24 rounded-full mx-6"
      src={profile_picture}
      alt="Profile"
    />
  );
};

export default ProfileImage;
