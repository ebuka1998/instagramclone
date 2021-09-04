const {gql} = require('apollo-server')

module.exports = gql`
  scalar DateTime

  type User {
    user_id: ID!
    username: String!
    email: String!
    phone_number: String
    bio: String
    user_password: String
    gender: String
    profile_picture: String
    token: String
    following_followed_id: Boolean
    followed_id: ID
    follower_id: ID
    user_created_at: DateTime
  }

  type Like {
    like_id: ID!
    postliked_id: ID!
    userthatliked_id: ID!
  }

  type Post {
    post_id: ID!
    created_by: ID!
    post_image: String!
    post_description: String!
    created_at: DateTime
    username: String
    profile_picture: String
    user_id: ID!
    likes_count: Int!
    comments_count: Int!
  }

  type Follow {
    follow_id: ID!
    follower_id: ID!
    followed_id: ID!
    following_followed_id: Boolean
  }

  type Comment {
    comment_id: ID!
    name: String!
    comment: String!
    post_id: ID!
    user_id: ID!
    parent_id: ID
    depth: Int
    
  }
  
  type Mutation {
    registerUser(
        username: String!
        email: String!
        gender: String
        user_password: String!
        confirmPassword: String!
    ): User!

    loginUser(username: String! user_password: String!): User!
    updateUser(email: String! username: String! phone_number: String bio: String profile_picture: String!): User!

    createPost(post_image: String! post_description:String!): Post!

    followUser(followed_id: ID!): Follow!
    unfollowUser(followed_id: ID!): Follow!
    likePost(postliked_id: ID!): Like!

    createComment(
      name: String!
      comment: String!
      post_id: ID!
    ): Comment!

    replyComment(
      name: String!
      comment: String!
      post_id: ID!
      parent_id: ID!
    ): Comment!
  }
  
  type Query {
    getUsers: [User]!
    getLoggedInUser: User
    getUser(user_id: ID!): User!
    getPosts(offset: Int, limit: Int): [Post]!
    getPost(post_id: ID!): Post
    searchUsers(username: String!): [User]!
    getFollows: [Follow]!
    getLikes: [Like]!
    getUserPostedImages: [Post]!
    getAUserPostedImages(created_by: ID!): [Post]!
    getComments(post_id: ID!): [Comment]!
    getFollowers: [User]!
    getFollowing: [User]!
    getUserFollowers(user_id: ID!): [User]!
    getUserFollowing(user_id: ID!): [User]!
  }
`;