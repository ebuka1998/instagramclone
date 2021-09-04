import React from "react";

const MiniFollowCard = () => {
  return (
    <div className="flex justify-between mt-4 md:w-full">
      <div className="flex">
        <img
          className="inline object-cover w-8 h-8 rounded-full"
          src="https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Profile"
        />
        <h3 className="ml-3 text-lg">Nwaky chuks</h3>
      </div>
      <div>
        <button className="border-none text-blue-700">
          <h3>follow</h3>
        </button>
      </div>
    </div>
  );
};

export default MiniFollowCard;
