import React, {useEffect, useState} from "react";
import NavHeader from "../components/navbar/NavHeader";
import SubmitButton from "../components/forms/SubmitButton";
import {useMutation} from "@apollo/client";
import {storage} from "../firebase";
import {CREATE_POST} from "../graphql/queries";
import Spinner from "../components/spinner/Spinner";

const CreatepostPage = (props) => {
  const [p, setP] = useState(null);
  const [image, setImage] = useState("");
  const [post_image, setPostImage] = useState("");
  const [post_description, setPost_description] = useState("");

  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = () => {
    if (image) {
      const uploadTask = storage.ref(`posts/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setP(progress);
        },
        (error) => {
          console.log(error);
          setP(null);
        },
        () => {
          storage
            .ref("posts")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              setPostImage(url);
            });
          setP(null);
        }
      );
    }
  };

  useEffect(() => {
    uploadImage();
    //eslint-disable-next-line
  }, [image]);

  const [createPost, {loading}] = useMutation(CREATE_POST, {
    onError(err) {
      console.log(err.graphQLErrors[0]?.extensions.errors);
    },
    variables: {post_image, post_description},
  });

  const create = () => {
    createPost();
    props.history.push("/");
  };

  return (
    <>
      <NavHeader />
      <div className="py-20 h-screen bg-gray-300 px-2 mx-auto  md:px-64">
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <div className="md:flex">
            <div className="w-full">
              <div className="p-4 border-b-2">
                {" "}
                <span className="text-lg font-bold text-gray-600">
                  Add post
                </span>{" "}
              </div>
              <div className="p-3">
                <div className="mb-2">
                  {" "}
                  <span className="text-sm">Description</span>{" "}
                  <textarea
                    placeholder="add a description"
                    value={post_description}
                    onChange={(e) => setPost_description(e.target.value)}
                    cols="30"
                    rows="4"
                    className="px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                  ></textarea>
                </div>{" "}
                <div className="mb-2">
                  {" "}
                  <span>Image</span>
                  {p ? (
                    <div className="flex justify-center mb-5">
                      <Spinner classname="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
                    </div>
                  ) : post_image ? (
                    <div>
                      <img
                        src={post_image}
                        alt="post"
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                      <div className="absolute">
                        <div className="flex flex-col items-center ">
                          {" "}
                          <span className="block text-blue-400 font-normal">
                            Browse files
                          </span>{" "}
                        </div>
                      </div>{" "}
                      <input
                        type="file"
                        className="h-full w-full opacity-0"
                        onChange={onChangeFile}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-3 text-center pb-3">
                  {" "}
                  <SubmitButton
                    text="createPost"
                    disabled={p ? true : false}
                    register={create}
                    loading={loading}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatepostPage;
