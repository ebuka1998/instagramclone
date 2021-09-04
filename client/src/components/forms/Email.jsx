import React from "react";

const Email = ({ changeEmail, email, errors }) => {
  return (
    <div>
      <input
        type="text"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="email"
        placeholder="Email"
        onChange={changeEmail}
        defaultValue={email}
      />
      <div className="mb-4">
        <h6 className="text-red-500">
          {errors && errors.email ? "*" + errors.email : ""}
        </h6>
      </div>
    </div>
  );
};

export default Email;
