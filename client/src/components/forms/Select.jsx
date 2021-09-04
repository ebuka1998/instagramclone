import React from "react";

const Select = ({ changeGender, gender, errors }) => {
  return (
    <div>
      <select
        className="w-full border bg-white rounded px-3 py-2 mb-4 outline-none"
        placeholder="gender"
        onChange={changeGender}
        defaultValue={gender}
      >
        <option className="py-1">gender</option>
        <option className="py-1">Male</option>
        <option className="py-1">Female</option>
      </select>
      <div className="mb-4">
        <h6 className="text-red-500">
          {errors && errors.gender ? "*" + errors.gender : ""}
        </h6>
      </div>
    </div>
  );
};

export default Select;
