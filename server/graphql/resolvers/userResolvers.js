require('dotenv').config()
const pool = require('../../db')
const {validateEmail} = require('../../utils/validatingEmail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { UserInputError, AuthenticationError, ApolloError } = require('apollo-server')


module.exports = {
    Query: {
        async getUsers(_, __, {user}) {
            try {
                const users = await pool.query("SELECT user_id, username, profile_picture, bio, gender, phone_number, following_followed_id, followed_id, follower_id FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE user_id != $1", [user])
                //console.log(users)
                return users.rows
            } catch (error) {
                console.log(error)
            }
        },

        async getUser(_, {user_id}, {user}) {
            try {
                const userr = await pool.query("SELECT user_id, username, profile_picture, bio, gender, phone_number FROM users WHERE user_id = $1", [user_id])
                const followed = await pool.query("SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2", [user, user_id])
                return {...userr.rows[0], ...followed.rows[0]}
             } catch (error) {
               throw error
             }
        },

        async getLoggedInUser(_, __, {user}){
           try {
              const userLoggedIn = await pool.query("SELECT * FROM users WHERE user_id = $1", [user])
              if (!userLoggedIn) throw new AuthenticationError('Unauthenticated')
              return userLoggedIn.rows[0]
           } catch (error) {
             throw error
           }
        },

        async getFollows(_, __) {
            try {
                const follows = await pool.query("SELECT * FROM follows")
                return follows.rows
            } catch (error) {
                throw error
            }
        },

        async getFollowers(_, __, {user}) {
            try {
              const followers = await pool.query(
                "SELECT user_id, profile_picture, username FROM users LEFT JOIN follows on users.user_id = follows.follower_id WHERE follows.followed_id = $1;",
                [user]
              );
              return followers.rows;
            } catch (error) {
              throw error
            }
        },
        
        async getFollowing(_, __, {user}) {
            try {
                const following = await pool.query(
                "SELECT user_id, profile_picture, username FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE follows.follower_id = $1;",
                [user]
                );
                return following.rows;
            } catch (error) {
                throw error
            }
        },
        async getUserFollowers(_, {user_id}) {
            try {
              const followers = await pool.query(
                "SELECT user_id, profile_picture, username FROM users LEFT JOIN follows on users.user_id = follows.follower_id WHERE follows.followed_id = $1;",
                [user_id]
              );
              return followers.rows;
            } catch (error) {
              throw error
            }
        },
        
        async getUserFollowing(_, {user_id}) {
            try {
                const following = await pool.query(
                "SELECT user_id, profile_picture, username FROM users LEFT JOIN follows on users.user_id = follows.followed_id WHERE follows.follower_id = $1;",
                [user_id]
                );
                return following.rows;
            } catch (error) {
                throw error
            }
        },

        async searchUsers(_, {username},){
            try {
                let errors = {}

                if(username === "") errors.username = "please search users"

                if (Object.keys(errors).length > 0) {
                    throw new ApolloError('search error', { errors })
                }

                const searchedUsers = await pool.query("SELECT user_id, username, profile_picture FROM users WHERE username LIKE $1 ", [`%${username.toLowerCase()}%`])
                
                if(searchedUsers.rows.length === 0) errors.nouser = "user not found"

                if (Object.keys(errors).length > 0) {
                    throw new ApolloError('search error', { errors })
                }

                return searchedUsers.rows
            } catch (error) {
                throw error
            }
        }
    },

    Mutation: {
        async registerUser(_, args) {
            try {
                 const {email, username, gender, user_password, confirmPassword} = args
 
                 const secret = process.env.SECRET
 
                 let errors = {}
 
                 if(username.trim() === '') errors.username = 'username must not empty'
                 if(email.trim() === '') errors.email = 'email must not empty'
                 if(user_password === '') errors.user_password = 'password must not empty'
                 if(gender === '') errors.gender = 'gender must not empty'
                 if(confirmPassword === '') errors.confirmPassword = 'confirmPassword must not empty'
 
                 if(user_password !== confirmPassword) errors.confirmPassword = 'confirm password must match'
 
                 if(!validateEmail(email)) errors.email = 'wrong email format...'
 
                 let user = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email])
 
                 if(user.rows.length > 0) errors.username = 'user already taken'
 
                 if (Object.keys(errors).length > 0) {
                    throw new UserInputError('bad input', { errors })
                 }
 
                 const salt = await bcrypt.genSalt(10)
 
                 const password = await bcrypt.hash(user_password, salt)
 
 
                 user = await pool.query("INSERT INTO users (email, username, gender, user_password) VALUES ($1, $2, $3, $4) RETURNING *", [
                    email, username, gender, password
                 ])
                 const token = jwt.sign(user.rows[0].user_id, secret)
 
                 return {...user.rows[0], token}
            } catch (error) {
                throw error
            }
 
         },
 
         async loginUser(_, args){
            try {
                 const {username, user_password} = args
                 let errors = {}
                 const secret = process.env.SECRET
 
                 //VALIDATE INPUT
                 if(username === '') errors.username = 'username must not be empty'
               
                 if(user_password === '') errors.password = 'password must not be empty'

                 if (Object.keys(errors).length > 0) {
                  throw new UserInputError('bad input', { errors })
                }
 
                 // check if user exists
                 let user = await pool.query("SELECT * FROM users WHERE username = $1", [username])

                 if(user.rows.length === 0){
                  errors.username = 'user not found'
                  throw new UserInputError('user not found', { errors })
                  
                 }

                 const userPassword = await bcrypt.compare(user_password, user.rows[0].user_password)
 
                 if(!userPassword){
                    errors.password = 'incorrect password'
                    throw new UserInputError('incorrect password', { errors })
                 } 
 
                 const token = jwt.sign(user.rows[0].user_id, secret)
 
                 return {...user.rows[0], token} 
 
            } catch (error) {
                 throw error
            }
         },

        async updateUser(_, args, {user}){
            const {email, username, phone_number, bio, profile_picture} = args
            try {
                let errors = {}
                //VALIDATE INPUT
                if(username === '') errors.username = 'username must not be empty'
 
                if(email === '') errors.email = 'email must not be empty'

                if(!validateEmail(email)) errors.email = 'wrong email format...'

                if (Object.keys(errors).length > 0) {
                 throw new UserInputError('bad input', { errors })
               }

               const updatedUser = await pool.query("UPDATE users set email = $1, username = $2, phone_number = $3, bio = $4, profile_picture = $5 WHERE user_id = $6 RETURNING *", [
                   email, username, phone_number, bio, profile_picture, user
               ])
             
               return updatedUser.rows[0]

            } catch (error) {
                throw error
            }
        },

        async followUser(_, {followed_id}, {user}){
            try {
                let errors = {}
                const follwed = await pool.query(
                    "SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2",
                    [user, followed_id]
                  );
                  if (follwed.rows.length > 0) errors.followError = 'you are already following this user'
                  
                  if (Object.keys(errors).length > 0) {
                    throw new ApolloError('search error', { errors })
                    }

                  const follow = await pool.query(
                    "INSERT INTO follows (follower_id, followed_id, following_followed_id) VALUES ($1, $2, True) RETURNING *;",
                    [user, followed_id]
                  );
                  return follow.rows[0]
            } catch (error) {
                throw error
            }
        },
        async unfollowUser(_, {followed_id}, {user}) {
            try {
              const unfollow = await pool.query(
                "DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2;",
                [user, followed_id]
              );
              return unfollow.rows[0]
            } catch (error) {
              throw error
            }
          },
 
    }
  };