import React from "react";

const Name = ({ changeUsername, username, errors }) => {
  return (
    <div>
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded"
        name="fullname"
        placeholder="Full Name"
        onChange={changeUsername}
        defaultValue={username}
      />
      <div className="mb-4">
        <h6 className="text-red-500">
          {errors && errors.username ? "*" + errors.username : ""}
        </h6>
      </div>
    </div>
  );
};

export default Name;
