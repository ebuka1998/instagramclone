import React, {useRef, useState} from "react";
import DropDownNav from "./DropDownNav";
import NavPopOver from "./NavPopOver";
import {gql, useQuery} from "@apollo/client";
import {Link, withRouter} from "react-router-dom";

const NavHeader = (props) => {
  const buttonRef = useRef();
  const dropRef = useRef();
  const [name, setName] = useState("");

  const USER_QUERY = gql`
    query {
      getLoggedInUser {
        user_id
        username
        profile_picture
      }
    }
  `;
  const SEARCH_USERS_QUERY = gql`
    query searchUsers($username: String!) {
      searchUsers(username: $username) {
        user_id
        username
        profile_picture
      }
    }
  `;

  const {client, data} = useQuery(USER_QUERY);

  const {
    data: searchedUsers,
    loading: userLoading,
    refetch,
  } = useQuery(SEARCH_USERS_QUERY, {
    variables: {username: name},
  });

  const search = (e) => {
    setName(e.target.value);
    refetch();
  };

  const logout = () => {
    localStorage.removeItem("instagramToken");
    client.clearStore();
    props.history.push("/login");
  };
  return (
    <>
      <nav className="flex items-center justify-between bg-white shadow-lg p-2 container mx-auto px-4 lg:px-64 fixed z-10 top-0">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <h1 className="font-semibold text-xl tracking-tight">Instaclone</h1>
        </div>
        <div className="hidden sm:flex">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="search user"
              className="w-full pr-10 pl-4 py-1 border text-gray-700 focus:outline-none focus:border-green-500"
              ref={buttonRef}
              onChange={search}
            />
            <svg
              className="w-4 h-4 fill-current text-gray-500 -ml-8 z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <NavPopOver
              buttonRef={buttonRef}
              loading={userLoading}
              users={searchedUsers?.searchUsers}
            />
          </div>
        </div>
        <div className="w-full flex justify-end md:w-auto">
          <div>
            <Link to="/">
              <i
                className="fa fa-home inline-block text-sm lg:text-lg px-2  leading-none rounded text-black border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 md:mt-0"
                aria-hidden="true"
              ></i>
            </Link>
            {/* <i
              className="fa fa-compass inline-block text-sm lg:text-lg px-2  leading-none rounded text-black border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-2 md:mt-0"
              aria-hidden="true"
            ></i> */}
            <div className="inline-block">
              <button
                ref={dropRef}
                className="border-none focus:outline-none"
                type="button"
              >
                <img
                  className="inline object-cover w-6 h-6 rounded-full mx-2"
                  src={data?.getLoggedInUser?.profile_picture}
                  alt="Profile"
                />
              </button>

              <DropDownNav
                dropRef={dropRef}
                logout={logout}
                userProfile={`/profile/${data?.getLoggedInUser?.username}/${data?.getLoggedInUser?.user_id}`}
                createPost="/createpost"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default withRouter(NavHeader);
