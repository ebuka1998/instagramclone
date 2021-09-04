import React, { useContext, useEffect, useState } from "react";
import Name from "../components/forms/Name";
import Password from "../components/forms/Password";
import SubmitButton from "../components/forms/SubmitButton";
import HaveAnAccount from "../components/forms/HaveAnAccount";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";

const LoginPage = (props) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [user_password, setUser_password] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (localStorage.getItem("instagramToken")) props.history.push("/");
    //eslint-disable-next-line
  }, []);

  const [loginUser, { loading }] = useMutation(LOGIN_USER_QUERY, {
    update(_, { data: { loginUser: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { username, user_password },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <Name
            changeUsername={(e) => setUsername(e.target.value)}
            username={username}
            errors={errors}
          />
          <Password
            changeUser_password={(e) => setUser_password(e.target.value)}
            user_password={user_password}
            errors={errors}
          />
          <SubmitButton text="login" loading={loading} register={onSubmit} />
        </div>
        <HaveAnAccount
          loginregisterpage="/register"
          text="register"
          question="Don't have an account?"
        />
      </div>
    </div>
  );
};

const LOGIN_USER_QUERY = gql`
  mutation loginUser($username: String!, $user_password: String!) {
    loginUser(username: $username, user_password: $user_password) {
      user_id
      username
      token
    }
  }
`;

export default LoginPage;
