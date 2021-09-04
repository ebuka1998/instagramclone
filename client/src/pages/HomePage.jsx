import React, {useState} from "react";
import NavHeader from "../components/navbar/NavHeader";
import Card from "../components/card/Card";
import MiniProfileCard from "../components/card/MiniProfileCard";
import {
  POSTS_QUERY,
  LIKE_POST,
  GET_LIKES,
  COMMENT_ON_POST,
  COMMENT_QUERY,
} from "../graphql/queries";
import {gql, useMutation, useQuery} from "@apollo/client";
import moment from "moment";
import AnimateCard from "../components/card/AnimateCard";
import NoFollow from "../components/notfound/NoFollow";

const HomePage = () => {
  const [commentToPost, setCommentToPost] = useState({});
  const [disabled, setDisabled] = useState([]);

  const USER_QUERY = gql`
    query {
      getLoggedInUser {
        user_id
        username
        profile_picture
      }
    }
  `;
  const {data} = useQuery(USER_QUERY);

  const {
    data: posts,
    loading,
    fetchMore,
  } = useQuery(POSTS_QUERY, {
    variables: {
      offset: 0,
      limit: 2,
    },
    updateQuery: (prev, {fetchMoreResult}) => {
      console.log(prev);
      if (!fetchMoreResult) return prev;
      return Object.assign({}, prev, {
        chapters: [...prev.getPosts, ...fetchMoreResult.getPosts],
      });
    },
  });

  const onLoadMore = () => {
    fetchMore({
      variables: {
        offset: posts?.getPosts?.length,
      },
    });
  };

  const handleScroll = ({currentTarget}, onLoadMore) => {
    if (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
    ) {
      onLoadMore();
    }
  };

  const {data: likes} = useQuery(GET_LIKES);

  const [likePost] = useMutation(LIKE_POST, {
    refetchQueries: [GET_LIKES, POSTS_QUERY],
  });

  const changeComment = (idx) => (e) => {
    setCommentToPost({
      ...commentToPost,
      [idx]: e.target.value,
    });
    setDisabled([...disabled, idx]);
  };

  const likedPost = likes && likes?.getLikes?.map((x) => x.postliked_id);

  const [commentPost] = useMutation(COMMENT_ON_POST, {
    refetchQueries: [POSTS_QUERY, COMMENT_QUERY],
  });

  const commentt = (post_id) => {
    commentPost({
      variables: {
        name: data?.getLoggedInUser?.username,
        comment: commentToPost[post_id],
        post_id: post_id,
      },
    });
    setCommentToPost({
      [post_id]: "",
    });
  };

  return (
    <>
      <NavHeader />
      <div className="mx-auto  lg:px-64 lg:mt-20 mt-12">
        <div className="flex">
          <div className="lg:w-2/3 w-full">
            {loading ? (
              <div>
                <AnimateCard />
                <AnimateCard />
                <AnimateCard />
                <AnimateCard />
                <AnimateCard />
              </div>
            ) : posts?.getPosts?.length === 0 ? (
              <NoFollow />
            ) : (
              posts?.getPosts?.map((post, i) => (
                <div
                  key={post.post_id}
                  onScroll={(e) => handleScroll(e, onLoadMore)}
                >
                  <Card
                    username={post.username}
                    post_image={post.post_image}
                    description={post.post_description}
                    profile_picture={post.profile_picture}
                    created_at={moment(post.created_at).fromNow()}
                    comments={post.comments_count}
                    likes={post.likes_count}
                    likePost={() =>
                      likePost({variables: {postliked_id: post.post_id}})
                    }
                    liked_array={likedPost && likedPost}
                    post_id={post?.post_id}
                    nameInput={post?.post_id}
                    inputId={post?.post_id}
                    changeComment={changeComment(post.post_id)}
                    disabled={!disabled.includes(post.post_id)}
                    comment={commentToPost[post.post_id]}
                    submitComment={() => commentt(post.post_id)}
                  />
                </div>
              ))
            )}
          </div>
          <div className="md:w-1/3 hidden sm:flex ml-6">
            <div className="fixed">
              <MiniProfileCard
                username={data?.getLoggedInUser?.username}
                profile_image={data?.getLoggedInUser?.profile_picture}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
