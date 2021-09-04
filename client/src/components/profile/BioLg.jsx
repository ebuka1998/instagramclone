import React from "react";

const BioLg = ({
  gender,
  bio,
  phone_number,
  no_post,
  no_followers,
  no_following,
}) => {
  return (
    <>
      <div className="flex mt-4 hidden justify-between sm:flex">
        <h3>{no_post} posts</h3>
        <h3>{no_followers} followers</h3>
        <h3>{no_following} following</h3>
      </div>
      <div className="mt-4 hidden sm:flex">
        {phone_number === null ? "" : <h3>tel: {phone_number}</h3>}
      </div>
      <div className="mt-4 hidden sm:flex">
        <h3>gender: {gender}</h3>
      </div>
      <div className="mt-4 hidden sm:flex">
        {bio === null ? "" : <p>{bio}</p>}
      </div>
    </>
  );
};

export default BioLg;
