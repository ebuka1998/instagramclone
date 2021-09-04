import React, {useState} from "react";
import {Link} from "react-router-dom";

const Card = ({
  username,
  description,
  created_at,
  profile_picture,
  post_image,
  likes,
  likePost,
  post_id,
  liked_array,
  changeComment,
  comment,
  submitComment,
  changeId,
  nameInput,
  inputId,
  disabled,
  textInput,
  comments,
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="w-full mb-12">
      <div className="bg-white shadow-lg flex h-14 justify-between items-center">
        <img
          className="inline object-cover w-8 h-8 rounded-full mx-6"
          src={profile_picture}
          alt="Profile"
        />
        <button>
          <i className="fa fa-ellipsis-h mx-6" aria-hidden="true"></i>
        </button>
      </div>
      <div className="h-96">
        <img
          className="h-full object-fill  w-full"
          src={post_image}
          alt="chris"
        />
      </div>
      <div className="w-full bg-white shadow-lg pb-6">
        <div className="flex mt-3 mx-6">
          <button
            className="text-red-300 border-none focus:outline-none"
            onClick={likePost}
          >
            <i
              className={
                liked_array?.includes(post_id)
                  ? "fas fa-heart text-red"
                  : "far fa-heart text-black"
              }
            ></i>
          </button>
          {/* <button className="text-gray-300 ml-3 border-none focus:outline-none">
            <i className="fa fa-comment text-xl" aria-hidden="true"></i>
          </button> */}
        </div>
        <div className="flex mt-2 mx-6">
          {likes === 0 ? (
            ""
          ) : (
            <>
              <h4>
                liked by{" "}
                <span>
                  {likes} {likes === 0 ? "" : likes === 1 ? "person" : "people"}
                </span>
              </h4>
            </>
          )}
        </div>
        <div className="flex mt-2 mx-6">
          <div>
            <p>
              <span className="pr-3 font-bold">{username}</span>
              {description?.length > 100 && !readMore
                ? description?.slice(0, 50) + "..."
                : description}
              {description?.length > 100 && !readMore ? (
                <span
                  onClick={() => setReadMore(!readMore)}
                  className="font-extralight text-gray-600 cursor-pointer"
                >
                  read more...
                </span>
              ) : (
                <span
                  className="font-extralight text-gray-600 cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? "" : "read less"}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex mt-2 mx-6">
          <div>
            <h6 className="font-extralight text-gray-400 cursor-pointer">
              <Link to={`/post/${post_id}`}>view all {comments} comments</Link>
            </h6>
          </div>
        </div>
        <div className="flex mt-2 mx-6">
          <div className="pb-2">
            <h6 className="font-extralight">{created_at}</h6>
          </div>
        </div>
        <hr />
        <div className="flex justify-between mt-2 mx-3 ">
          <input
            type="text"
            placeholder="add comment"
            className="focus:outline-none focus:border-blue-300 mt-2 mx-3 w-3/5"
            //value={comment}
            value={comment || ""}
            onChange={changeComment}
            onFocus={changeId}
            name={nameInput}
            id={inputId}
            autoComplete="off"
            ref={textInput}
          />
          <button
            disabled={disabled}
            onClick={submitComment}
            className={
              disabled
                ? "mt-2 mx-3 cursor-pointer text-blue-200 border-none focus:outline-none"
                : "mt-2 mx-3 cursor-pointer text-blue-500 border-none focus:outline-none"
            }
          >
            post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
