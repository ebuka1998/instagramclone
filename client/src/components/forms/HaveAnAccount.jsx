import React from "react";
import { Link } from "react-router-dom";

const HaveAnAccount = ({ loginregisterpage, text, question }) => {
  return (
    <div className="text-grey-dark mt-6">
      {question}
      <Link
        className="no-underline border-b border-blue text-blue-600 ml-3"
        to={loginregisterpage}
      >
        {text}
      </Link>
      .
    </div>
  );
};

export default HaveAnAccount;
