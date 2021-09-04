import React, {useEffect, useState} from "react";
import NavHeader from "../components/navbar/NavHeader";
import Email from "../components/forms/Email";
import Name from "../components/forms/Name";
import Bio from "../components/forms/Bio";
import PhoneNo from "../components/forms/PhoneNo";
import SubmitButton from "../components/forms/SubmitButton";
import {useMutation, useQuery} from "@apollo/client";
import {storage} from "../firebase";
import {UPDATE_USER, USER_PROFILE_QUERY} from "../graphql/queries";

const EditProfilePage = () => {
  const {data} = useQuery(USER_PROFILE_QUERY);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [profile_picture, setProfile_picture] = useState("");
  const [image, setImage] = useState("");

  const [p, setP] = useState(null);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail(data?.getLoggedInUser?.email);
    setUsername(data?.getLoggedInUser?.username);
    setBio(data?.getLoggedInUser?.bio);
    setPhone_number(data?.getLoggedInUser?.phone_number);
    setProfile_picture(data?.getLoggedInUser?.profile_picture);
  }, [data]);

  const onChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      setImage(files);
    }
    uploadImage();
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
              setProfile_picture(url);
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

  const [updateUser, {loading}] = useMutation(UPDATE_USER, {
    refetchQueries: [{query: USER_PROFILE_QUERY}],
    onError(err) {
      setErrors(err.graphQLErrors[0]?.extensions.errors);
    },
    variables: {
      email,
      username,
      phone_number,
      bio,
      profile_picture,
    },
  });

  const update = () => {
    updateUser();
    window.history.back();
  };

  return (
    <div>
      <NavHeader />
      <div className="mx-auto  md:px-64 md:mt-20 mt-16">
        <div className="flex flex-col justify-center">
          <div className="flex mb-4 lg:mx-48">
            <div>
              {p ? (
                <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
              ) : (
                <img
                  className="object-cover lg:w-40 lg:h-40 w-24 h-24 rounded-full mx-6"
                  src={
                    profile_picture && profile_picture !== ""
                      ? profile_picture
                      : data?.getLoggedInUser?.profile_picture
                  }
                  alt="Profile"
                />
              )}
            </div>
            <div className="lg:mt-12">
              <input
                className="cursor-pointer absolute block  pin-r pin-t"
                type="file"
                name="vacancyImageFiles"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="lg:w-1/2 lg:m-auto w-full mr-3">
            <Email
              email={email}
              changeEmail={(e) => setEmail(e.target.value)}
              errors={errors}
            />
          </div>
          <div className="lg:w-1/2 lg:m-auto">
            <Name
              username={username}
              changeUsername={(e) => setUsername(e.target.value)}
              errors={errors}
            />
          </div>
          <div className="lg:w-1/2 lg:m-auto">
            <PhoneNo
              phone={phone_number}
              changePhone={(e) => setPhone_number(e.target.value)}
            />
          </div>
          <div className="lg:w-1/2 lg:m-auto">
            <Bio Bio={bio} changeBio={(e) => setBio(e.target.value)} />
          </div>
          <div className="lg:w-1/2 lg:m-auto">
            <SubmitButton
              text="edit"
              loading={loading}
              register={update}
              disabled={p ? true : false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
