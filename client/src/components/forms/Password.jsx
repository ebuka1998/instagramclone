import React from "react";

const Password = ({ changeUser_password, user_password, errors }) => {
  return (
    <div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="password"
        placeholder="Password"
        onChange={changeUser_password}
        defaultValue={user_password}
      />
      <div className="mb-4">
        <h6 className="text-red-500">
          {errors && errors.user_password ? "*" + errors.user_password : ""}
        </h6>
      </div>
    </div>
  );
};

export default Password;
