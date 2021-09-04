import React from "react";

const SuggestedFCard = () => {
  return (
    <div className="flex justify-between mt-4 md:w-full">
      <div className="flex">
        <img
          className="inline object-cover w-16 h-16 rounded-full"
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Profile"
        />
        <h3 className="ml-3 text-lg mt-3">Nwaky chuks</h3>
      </div>
      <div>
        <button className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">
          <h3>follow</h3>
        </button>
      </div>
    </div>
  );
};

export default SuggestedFCard;
