import {gql} from "@apollo/client";

export const USER_QUERY = gql`
  query getUser($user_id: ID!) {
    getUser(user_id: $user_id) {
      user_id
      username
      profile_picture
      gender
      bio
      following_followed_id
      followed_id
      follower_id
    }
  }
`;

export const COMMENT_QUERY = gql`
  query getComments($post_id: ID!) {
    getComments(post_id: $post_id) {
      post_id
      comment
      depth
      comment_id
      user_id
      name
    }
  }
`;

export const FOLLOWER_QUERY = gql`
  query {
    getFollowers {
      user_id
      profile_picture
      username
    }
  }
`;

export const FOLLOWING_QUERY = gql`
  query {
    getFollowing {
      user_id
      profile_picture
      username
    }
  }
`;

export const USER_FOLLOWER_QUERY = gql`
  query getUserFollowers($user_id: ID!) {
    getUserFollowers(user_id: $user_id) {
      user_id
      profile_picture
      username
    }
  }
`;

export const USER_FOLLOWING_QUERY = gql`
  query getUserFollowing($user_id: ID!) {
    getUserFollowing(user_id: $user_id) {
      user_id
      profile_picture
      username
    }
  }
`;

export const GET_MYPOST_QUERY = gql`
  query {
    getUserPostedImages {
      post_id
      post_image
    }
  }
`;

export const GET_USER_POST_QUERY = gql`
  query getAUserPostedImages($created_by: ID!) {
    getAUserPostedImages(created_by: $created_by) {
      post_id
      post_image
    }
  }
`;

export const POSTS_QUERY = gql`
  query getPosts($offset: Int, $limit: Int) {
    getPosts(offset: $offset, limit: $limit) {
      user_id
      username
      post_id
      created_at
      profile_picture
      post_image
      likes_count
      post_description
      comments_count
    }
  }
`;

export const POST_QUERY = gql`
  query getPost($post_id: ID!) {
    getPost(post_id: $post_id) {
      post_id
      post_image
    }
  }
`;

// export const POSTS_QUERY = gql`
//   query {
//     getPosts {
//       user_id
//       username
//       post_id
//       created_at
//       profile_picture
//       post_image
//       likes_count
//       post_description
//       comments_count
//     }
//   }
// `;

export const USERLOGGEDIN_QUERY = gql`
  query {
    getLoggedInUser {
      user_id
      username
      profile_picture
    }
  }
`;

export const USER_PROFILE_QUERY = gql`
  query {
    getLoggedInUser {
      user_id
      email
      username
      profile_picture
      phone_number
      bio
      gender
    }
  }
`;
export const GET_FOLLOWS = gql`
  query {
    getFollows {
      follow_id
      follower_id
      followed_id
      following_followed_id
    }
  }
`;
export const GET_LIKES = gql`
  query {
    getLikes {
      like_id
      userthatliked_id
      postliked_id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!
    $username: String!
    $phone_number: String
    $bio: String
    $profile_picture: String!
  ) {
    updateUser(
      email: $email
      username: $username
      phone_number: $phone_number
      bio: $bio
      profile_picture: $profile_picture
    ) {
      user_id
      email
      username
      profile_picture
      phone_number
      bio
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($followed_id: ID!) {
    followUser(followed_id: $followed_id) {
      follower_id
      followed_id
      following_followed_id
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($post_image: String!, $post_description: String!) {
    createPost(post_image: $post_image, post_description: $post_description) {
      post_id
      created_by
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postliked_id: ID!) {
    likePost(postliked_id: $postliked_id) {
      postliked_id
      userthatliked_id
    }
  }
`;

export const COMMENT_ON_POST = gql`
  mutation createComment($name: String!, $comment: String!, $post_id: ID!) {
    createComment(name: $name, comment: $comment, post_id: $post_id) {
      comment_id
      comment
      name
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation replyComment(
    $name: String!
    $comment: String!
    $post_id: ID!
    $parent_id: ID!
  ) {
    replyComment(
      name: $name
      comment: $comment
      post_id: $post_id
      parent_id: $parent_id
    ) {
      comment_id
      comment
      name
      parent_id
    }
  }
`;
