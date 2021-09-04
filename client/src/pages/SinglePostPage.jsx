import {gql, useMutation, useQuery} from "@apollo/client";
import React, {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import NavHeader from "../components/navbar/NavHeader";
import {
  COMMENT_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  COMMENT_ON_POST,
  REPLY_COMMENT,
} from "../graphql/queries";

const SinglePostPage = () => {
  const USER_QUERY = gql`
    query {
      getLoggedInUser {
        user_id
        username
      }
    }
  `;
  const {data} = useQuery(USER_QUERY);

  const inputRef = useRef(null);
  const {id} = useParams();
  const [commentToPost, setCommentToPost] = useState("");
  const [parent_id, setParentId] = useState("");
  //const [errors, setErrors] = useState({});
  const {data: comments, loading} = useQuery(COMMENT_QUERY, {
    variables: {post_id: id && id},
  });

  const {data: post, loading: post_loading} = useQuery(POST_QUERY, {
    variables: {post_id: id && id},
  });

  const [commentPost] = useMutation(COMMENT_ON_POST, {
    refetchQueries: [POST_QUERY, COMMENT_QUERY],
  });

  const [replyComment] = useMutation(REPLY_COMMENT, {
    refetchQueries: [POSTS_QUERY, COMMENT_QUERY],
  });

  const activateReply = (commentId) => {
    inputRef?.current?.focus();
    setParentId(commentId);
  };

  const commentt = () => {
    commentPost({
      variables: {
        name: data?.getLoggedInUser?.username,
        comment: commentToPost,
        post_id: id && id,
      },
    });
    setCommentToPost("");
  };

  const replyCommentt = () => {
    replyComment({
      variables: {
        name: data?.getLoggedInUser?.username,
        comment: commentToPost,
        post_id: id && id,
        parent_id,
      },
    });
    setParentId("");
    setCommentToPost("");
  };

  const commentReply = () => {
    if (parent_id) {
      replyCommentt();
    }

    if (!parent_id) {
      commentt();
    }
  };

  if (loading) return "Loading...";

  return (
    <>
      <NavHeader />
      <div className="mx-auto  md:px-64 md:mt-20 mt-16">
        <div className="w-full lg:max-w-full lg:flex">
          <div className="h-48 lg:h-auto lg:w-48 lg:w-96 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
            <img alt="me" src={post?.getPost?.post_image} className="h-full" />
          </div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-4 overflow-y-auto h-96 w-96">
              {comments?.getComments?.length === 0 ? (
                <h2>no comments</h2>
              ) : (
                <ul className="list-none">
                  {comments?.getComments?.map((comment) => (
                    <div key={comment.comment_id}>
                      {comment.depth === 1 ? (
                        <li className="mb-2 text-sm">
                          <span className="mr-2 text-bold font-bold">
                            {comment.name}
                          </span>
                          {comment.comment}
                          <span
                            className="ml-2 font-semibold text-blue-400 cursor-pointer"
                            onClick={() => activateReply(comment.comment_id)}
                          >
                            reply
                          </span>
                        </li>
                      ) : (
                        <ul className="ml-5 mt-3">
                          <li className="mb-2">
                            {" "}
                            <span className="mr-2 font-bold">
                              {comment.name}
                            </span>
                            {comment.comment}
                            <span className="ml-2 font-semibold text-blue-400 cursor-pointer">
                              reply
                            </span>
                          </li>
                        </ul>
                      )}
                    </div>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-between mt-2 ">
              <input
                type="text"
                placeholder="comment"
                className="w-full  mr-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                autoComplete="off"
                ref={inputRef}
                value={commentToPost}
                onChange={(e) => setCommentToPost(e.target.value)}
              />
              <button
                className="mt-2 mx-3 cursor-pointer text-blue-500 border-none focus:outline-none"
                onClick={commentReply}
              >
                post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
