import React from "react";

const BioSm = ({
  gender,
  bio,
  phone_number,
  no_post,
  no_followers,
  no_following,
}) => {
  return (
    <>
      <div className="lg:hidden">
        <hr className="mt-3" />
        <div className="ml-8 mt-4">
          {phone_number === null ? "" : <h3>tel: {phone_number}</h3>}
        </div>
        <div className="ml-8 mt-4">
          <h3>gender: {gender}</h3>
        </div>
        <div className="ml-8 mt-3">{bio === null ? "" : <p>{bio}</p>}</div>
        <hr />
        <div className="flex justify-around mt-8 ml-2">
          <h3>{no_post} posts</h3>
          <h3>{no_followers} followers</h3>
          <h3>{no_following} following</h3>
        </div>
        <hr />
      </div>
    </>
  );
};

export default BioSm;
