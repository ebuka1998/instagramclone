import React from "react";
import NavHeader from "../components/navbar/NavHeader";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileName from "../components/profile/ProfileName";
import BioLg from "../components/profile/BioLg";
import BioSm from "../components/profile/BioSm";
import PostImage from "../components/profile/PostImage";
import {useParams} from "react-router-dom";
import {
  USER_QUERY,
  USERLOGGEDIN_QUERY,
  FOLLOW_USER,
  GET_USER_POST_QUERY,
  USER_FOLLOWING_QUERY,
  USER_FOLLOWER_QUERY,
  FOLLOWING_QUERY,
} from "../graphql/queries";
import NoPost from "../components/notfound/NoPost";
import {useMutation, useQuery} from "@apollo/client";

const AUserProfilePage = () => {
  const {idd} = useParams();
  //const [errors, setErrors] = useState({});
  const {data, loading} = useQuery(USER_QUERY, {
    variables: {user_id: idd && idd},
  });

  const {data: loggedInUser} = useQuery(USERLOGGEDIN_QUERY);

  const {data: followers} = useQuery(USER_FOLLOWER_QUERY, {
    variables: {
      user_id: idd && idd,
    },
  });
  const {data: following} = useQuery(USER_FOLLOWING_QUERY, {
    variables: {
      user_id: idd && idd,
    },
  });
  const {data: no_posts, loading: post_loading} = useQuery(
    GET_USER_POST_QUERY,
    {
      variables: {
        created_by: idd && idd,
      },
    }
  );

  const [follow, {loading: followLoading}] = useMutation(FOLLOW_USER, {
    refetchQueries: [USER_QUERY, USER_FOLLOWER_QUERY, FOLLOWING_QUERY],
    variables: {
      followed_id: idd,
    },
  });

  const followUser = () => follow();

  return (
    <>
      <div>
        <NavHeader />
        <div className="mx-auto  md:px-64 md:mt-20 mt-16">
          <div className="w-full">
            {loading ? (
              <h1>loading</h1>
            ) : (
              <div className="flex justify-start">
                <ProfileImage
                  profile_picture={data?.getUser?.profile_picture}
                />
                <div className="md:mt-6 lg:ml-24 ml-8 mt-4 lg:w-3/5">
                  <div className="flex lg:flex-row flex-col">
                    <ProfileName username={data?.getUser?.username} />
                    {data?.getUser?.follower_id ===
                      loggedInUser?.getLoggedInUser?.user_id &&
                    data?.getUser?.following_followed_id === true ? (
                      <button className="ml-4 border-none focus:outline-none">
                        following
                      </button>
                    ) : (
                      <button
                        className="ml-4 border-none focus:outline-none"
                        onClick={followUser}
                      >
                        {followLoading ? "loading..." : "follow"}
                      </button>
                    )}
                  </div>
                  <div>
                    <BioLg
                      gender={data?.getUser?.gender}
                      bio={data?.getUser?.bio}
                      phone_number={data?.getUser?.phone_number}
                      no_followers={followers?.getUserFollowers?.length}
                      no_following={following?.getUserFollowing?.length}
                      no_post={no_posts?.getAUserPostedImages?.length}
                    />
                  </div>
                </div>
              </div>
            )}

            <BioSm
              gender={data?.getUser?.gender}
              bio={data?.getUser?.bio}
              phone_number={data?.getUser?.phone_number}
              no_followers={followers?.getUserFollowers?.length}
              no_following={following?.getUserFollowing?.length}
              no_post={no_posts?.getAUserPostedImages?.length}
            />
          </div>
          <div className="mt-10">
            <div className="mt-10">
              <div className="flex w-full flex-wrap">
                {post_loading ? (
                  "loading"
                ) : no_posts?.getAUserPostedImages.length === 0 ? (
                  <NoPost />
                ) : (
                  no_posts?.getAUserPostedImages?.map((x) => (
                    <PostImage post_image={x.post_image} key={x.post_id} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AUserProfilePage;
