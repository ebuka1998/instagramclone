import React from "react";
import NavHeader from "../components/navbar/NavHeader";
import ProfileImage from "../components/profile/ProfileImage";
import ProfileName from "../components/profile/ProfileName";
import EditProfileBtn from "../components/profile/EditProfileBtn";
import BioLg from "../components/profile/BioLg";
import BioSm from "../components/profile/BioSm";
import PostImage from "../components/profile/PostImage";
import {
  USER_PROFILE_QUERY,
  FOLLOWER_QUERY,
  FOLLOWING_QUERY,
  GET_MYPOST_QUERY,
} from "../graphql/queries";
import NoPost from "../components/notfound/NoPost";
import {useQuery} from "@apollo/client";

const ProfilePage = () => {
  const {loading, data} = useQuery(USER_PROFILE_QUERY);
  const {data: followers} = useQuery(FOLLOWER_QUERY);
  const {data: following} = useQuery(FOLLOWING_QUERY);
  const {data: no_posts, loading: post_loading} = useQuery(GET_MYPOST_QUERY);
  return (
    <>
      <NavHeader />
      <div className="mx-auto  md:px-64 md:mt-20 mt-16">
        {loading && loading ? (
          <h1>loading</h1>
        ) : (
          <>
            <div className="md:w-full">
              <div className="flex justify-start">
                <div>
                  <ProfileImage
                    profile_picture={data.getLoggedInUser?.profile_picture}
                  />
                </div>
                <div className="md:mt-6 lg:ml-24 ml-8 mt-4 lg:w-3/5">
                  <div className="flex lg:flex-row flex-col">
                    <ProfileName username={data.getLoggedInUser?.username} />
                    <EditProfileBtn editpage="/account/edit" />
                  </div>
                  <div>
                    <BioLg
                      gender={data.getLoggedInUser?.gender}
                      bio={data.getLoggedInUser?.bio}
                      phone_number={data.getLoggedInUser?.phone_number}
                      no_followers={followers?.getFollowers?.length}
                      no_following={following?.getFollowing?.length}
                      no_post={no_posts?.getUserPostedImages?.length}
                    />
                  </div>
                </div>
              </div>
              <BioSm
                gender={data.getLoggedInUser?.gender}
                bio={data.getLoggedInUser?.bio}
                phone_number={data.getLoggedInUser?.phone_number}
                no_followers={followers?.getFollowers?.length}
                no_following={following?.getFollowing?.length}
                no_post={no_posts?.getUserPostedImages?.length}
              />
            </div>
            <div className="mt-10">
              <div className="flex w-full flex-wrap">
                {post_loading ? (
                  "loading"
                ) : no_posts?.getUserPostedImages.length === 0 ? (
                  <NoPost />
                ) : (
                  no_posts?.getUserPostedImages?.map((x) => (
                    <PostImage post_image={x.post_image} key={x.post_id} />
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
