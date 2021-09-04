import React from "react";
import { Link } from "react-router-dom";

const EditProfileBtn = ({ editpage }) => {
  return (
    <Link to={editpage} className="lg:ml-8 lg:mt-0 mt-3">
      Edit profile
    </Link>
  );
};

export default EditProfileBtn;
