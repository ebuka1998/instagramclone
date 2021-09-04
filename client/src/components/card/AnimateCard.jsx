import React from "react";

const AnimateCard = () => {
  return (
    <div className="w-full mb-12">
      <div className="bg-white shadow-lg flex h-14 justify-between items-center animate-pulse">
        <div className="w-8 h-8 rounded-full mx-6 bg-gray-300"></div>
      </div>
      <div className="h-96 animate-pulse bg-gray-200"></div>
      <div className="w-full bg-white shadow-lg pb-6 animate-pulse">
        <div className="flex mt-3 mx-6 animate-pulse w-48 rounded-2xl bg-gray-200 h-8"></div>
        <div className="flex mt-2 mx-6 animate-pulse"></div>
        <div className="flex mt-2 mx-6 animate-pulse">
          <div>
            <p></p>
          </div>
        </div>

        <div className="flex mt-2 mx-6 animate-pulse">
          <div></div>
        </div>
        <div className="flex mt-2 mx-6 animate-pulse">
          <div className="pb-2 animate-pulse"></div>
        </div>
        <hr />
        <div className="flex justify-between mt-2 mx-3 animate-pulse rounded-2xl bg-gray-200 h-8"></div>
      </div>
    </div>
  );
};

export default AnimateCard;
