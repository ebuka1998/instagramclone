import React from "react";
import Popover from "@material-tailwind/react/Popover";
import PopoverContainer from "@material-tailwind/react/PopoverContainer";
import PopoverHeader from "@material-tailwind/react/PopoverHeader";
import PopoverBody from "@material-tailwind/react/PopoverBody";
import {withRouter} from "react-router-dom";

const NavPopOver = ({buttonRef, users, loading, history, errors}) => {
  return (
    <>
      <Popover placement="bottom" ref={buttonRef}>
        <PopoverContainer>
          <PopoverHeader>Search users</PopoverHeader>
          <PopoverBody>
            <div className="w-72 h-96 mt-2 overflow-y-auto">
              {users === undefined ? (
                <h1 className="text-center">search user</h1>
              ) : loading ? (
                <h1 className="text-center">loading</h1>
              ) : errors ? (
                <h1>user not found</h1>
              ) : (
                users?.map((user) => (
                  <>
                    <div
                      key={user.user_id}
                      className="flex cursor-pointer mb-3"
                      onClick={() =>
                        history.push(`/${user.username}/${user.user_id}`)
                      }
                    >
                      <img
                        className="inline object-cover w-8 h-8 rounded-full"
                        src={user.profile_picture}
                        alt="Profile"
                      />
                      <h3 className="ml-3 text-lg">{user.username}</h3>
                    </div>
                  </>
                ))
              )}
            </div>
          </PopoverBody>
        </PopoverContainer>
      </Popover>
    </>
  );
};

export default withRouter(NavPopOver);
