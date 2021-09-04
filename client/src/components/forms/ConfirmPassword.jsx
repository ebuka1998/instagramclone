import React from "react";

const ConfirmPassword = ({
  changeConfirmPassword,
  confirmPassword,
  errors,
}) => {
  return (
    <div>
      <input
        type="password"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="confirm_password"
        placeholder="Confirm Password"
        onChange={changeConfirmPassword}
        value={confirmPassword}
      />
      <div className="mb-4">
        <h6 className="text-red-500">
          {errors && errors.confirmPassword ? "*" + errors.confirmPassword : ""}
        </h6>
      </div>
    </div>
  );
};

export default ConfirmPassword;
