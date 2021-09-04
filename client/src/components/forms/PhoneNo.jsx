import React from "react";

const PhoneNo = ({ changePhone, phone }) => {
  return (
    <div>
      <input
        type="number"
        className="block border border-grey-light w-full p-3 rounded mb-4"
        name="email"
        placeholder="phone"
        onChange={changePhone}
        defaultValue={phone}
      />
    </div>
  );
};

export default PhoneNo;
