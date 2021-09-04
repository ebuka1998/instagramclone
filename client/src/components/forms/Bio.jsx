import React from "react";

const Bio = ({ Bio, changeBio }) => {
  return (
    <div>
      <textarea
        type="text"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows="4"
        name="bio"
        placeholder="bio"
        onChange={changeBio}
        defaultValue={Bio}
      />
      <textarea />
    </div>
  );
};

export default Bio;
