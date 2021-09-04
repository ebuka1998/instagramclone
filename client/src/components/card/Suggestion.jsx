import React from "react";

const Suggestion = () => {
  return (
    <div className="flex justify-between mt-8 md:w-full">
      <div>
        <h3>Suggestions For You</h3>
      </div>
      <div className="ml-40">
        <button className="text-blue-400">
          <h3>see all</h3>
        </button>
      </div>
    </div>
  );
};

export default Suggestion;
