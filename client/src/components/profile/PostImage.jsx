import React from "react";

const PostImage = ({post_image}) => {
  return (
    <div className="lg:w-1/4 w-1/3 lg:mb-2 lg:border-0 border-2 border-gray-400">
      <img
        className="inline object-cover lg:w-60 lg:h-60 w-full h-28"
        src={post_image}
        alt="Profile"
      />
    </div>
  );
};

export default PostImage;
