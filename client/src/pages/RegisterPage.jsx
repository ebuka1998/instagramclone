import React, { useContext, useEffect, useState } from "react";
import Select from "../components/forms/Select";
import Name from "../components/forms/Name";
import Email from "../components/forms/Email";
import Password from "../components/forms/Password";
import ConfirmPassword from "../components/forms/ConfirmPassword";
import SubmitButton from "../components/forms/SubmitButton";
import HaveAnAccount from "../components/forms/HaveAnAccount";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";

const RegisterPage = (props) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [user_password, setUser_password] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("instagramToken")) props.history.push("/");
    //eslint-disable-next-line
  }, []);

  const [addUser, { loading }] = useMutation(REGISTER_USER_QUERY, {
    update(_, { data: { registerUser: userData } }) {
      login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: { username, email, gender, user_password, confirmPassword },
  });

  const onChangeName = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <Name
            changeUsername={onChangeName}
            username={username}
            errors={errors}
          />

          <Email
            changeEmail={(e) => setEmail(e.target.value)}
            email={email}
            errors={errors}
          />

          <Select
            changeGender={(e) => setGender(e.target.value)}
            gender={gender}
            errors={errors}
          />

          <Password
            changeUser_password={(e) => setUser_password(e.target.value)}
            user_password={user_password}
            errors={errors}
          />

          <ConfirmPassword
            changeConfirmPassword={(e) => setConfirmPassword(e.target.value)}
            confirmPassword={confirmPassword}
            errors={errors}
          />

          <SubmitButton
            text="Create Account"
            loading={loading}
            register={onSubmit}
          />
        </div>

        <HaveAnAccount
          loginregisterpage="/login"
          text="login"
          question="Already have an account?"
        />
      </div>
    </div>
  );
};

const REGISTER_USER_QUERY = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $gender: String!
    $user_password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      email: $email
      gender: $gender
      user_password: $user_password
      confirmPassword: $confirmPassword
    ) {
      user_id
      username
      token
    }
  }
`;

export default RegisterPage;
