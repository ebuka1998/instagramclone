import React from "react";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import {Link} from "react-router-dom";

const DropDownNav = ({dropRef, logout, userProfile, createPost}) => {
  return (
    <Popover placement="bottom" ref={dropRef}>
      <PopoverContainer className="w-48">
        <PopoverBody>
          <ul className="p-2">
            <li className="mb-4">
              <button className="focus:outline-none">
                <Link to={userProfile}>Profile</Link>
              </button>
            </li>
            <li className="mb-4">
              <button className="focus:outline-none">
                <Link to={createPost}>create post</Link>
              </button>
            </li>
            <li>
              <button className="focus:outline-none" onClick={logout}>
                logout
              </button>
            </li>
          </ul>
        </PopoverBody>
      </PopoverContainer>
    </Popover>
  );
};

export default DropDownNav;
