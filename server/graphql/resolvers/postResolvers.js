require('dotenv').config()
const pool = require('../../db')
//const { UserInputError, AuthenticationError } = require('apollo-server')


module.exports = {
    Query: {
        async getPosts(_, __,){
           try {
            const posts = await pool.query(`
              SELECT user_id, username, profile_picture, created_at, post_id, post_image, likes_count, comments_count, post_description from posts LEFT JOIN users on users.user_id = posts.created_by 
              ORDER BY created_at desc
              `)
            if (posts.rows.length < 0) {
                return "no posts at this time";
            }
            return posts.rows
           } catch (error) {
               throw error
           }
        },

        async getPost(_, {post_id}) {
            try {
                const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [post_id])
                return post.rows[0]
            } catch (error) {
                throw error
            }
        },
        async getLikes(_, __, {user}) {
            try {
                const likes = await pool.query("SELECT * FROM likes WHERE userthatliked_id = $1", [user])
                return likes.rows
            } catch (error) {
                throw error
            }
        },

        async getUserPostedImages(_, __, {user}) {
            try {
              const postImages = await pool.query(
                "SELECT post_id, post_image from posts WHERE created_by = $1",
                [user]
              );
              return postImages.rows
            } catch (error) {
              throw error
            }
        },
        async getAUserPostedImages(_, {created_by}) {
            try {
              const postImages = await pool.query(
                "SELECT post_id, post_image from posts WHERE created_by = $1",
                [created_by]
              );
              return postImages.rows
            } catch (error) {
              throw error
            }
        },
        async getComments(_, {post_id}){
          try {
              const comments = await pool.query(`

                  WITH RECURSIVE cte (comment_id, comment, name, post_id, user_id, path, parent_id, depth)  AS (
                    SELECT  comment_id,
                        comment,
                        name,
                        post_id,
                        user_id,
                        array[comment_id] AS path,
                        parent_id,
                        1 AS depth
                    FROM    comments
                    WHERE   parent_id IS NULL AND post_id = $1
                
                    UNION ALL
                
                    SELECT  comments.comment_id,
                        comments.comment,
                        comments.name,
                        comments.post_id,
                        comments.user_id,
                        cte.path || comments.comment_id,
                        comments.parent_id,
                        cte.depth + 1 AS depth
                    FROM    comments
                    JOIN cte ON comments.parent_id = cte.comment_id
                    )
                    SELECT comment_id, comment, name, post_id, user_id, path, depth FROM cte
                ORDER BY path;
              
              
              `, [post_id])
              return comments.rows
          } catch (error) {
            throw error
          }
        }    
    },

    Mutation: {
        async createPost(_, args, {user}){
            const {post_image, post_description} = args
            const createdPost = await pool.query("INSERT INTO posts (post_image, post_description, created_by) values ($1, $2, $3) RETURNING *", [
                post_image, post_description, user
            ])
            return createdPost.rows[0]
        },

        async likePost(_, {postliked_id}, {user}){
           try {
            const likes = await pool.query(
                "SELECT postliked_id, userthatliked_id FROM likes WHERE postliked_id = $1 AND userthatliked_id = $2;",
                [postliked_id, user]
            );
        
              if (likes.rows.length > 0) {
                await pool.query(
                    "UPDATE posts set likes_count = CASE WHEN likes_count = 0 THEN 0 WHEN likes_count > 0 THEN likes_count - 1 END WHERE post_id = $1",
                    [postliked_id]
                );

                const unlike = await pool.query("DELETE FROM likes WHERE userthatliked_id = $1 AND postliked_id = $2 RETURNING *", [user, postliked_id])

                return unlike.rows[0]
              }

              await pool.query(
                "update posts set likes_count = (likes_count + 1) WHERE post_id = $1",
                [postliked_id]
                );
            
              const like = await pool.query(
                "INSERT INTO likes (postliked_id, userthatliked_id) VALUES ($1, $2) RETURNING *",
                [postliked_id, user]
              );

              return like.rows[0]
           } catch (error) {
               throw error
           }
        },

        async createComment(_, args, {user}){
         try {
            const {name, comment, post_id} = args
            const commentToPost = await pool.query("INSERT INTO comments(name, comment, post_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, comment, post_id, user])
            await pool.query(
              "update posts set comments_count = (comments_count + 1) WHERE post_id = $1",
              [post_id]
              );
            return commentToPost.rows[0]
          } catch (error) {
            throw error
         }

        },

        async replyComment(_, args, {user}){
         try {
            const {name, comment, post_id, parent_id} = args
            const commentToPost = await pool.query("INSERT INTO comments(name, comment, post_id, user_id, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, comment, post_id, user, parent_id])
            await pool.query(
              "update posts set comments_count = (comments_count + 1) WHERE post_id = $1",
              [post_id]
              );
            return commentToPost.rows[0]
          } catch (error) {
            throw error
         }

        },
    }
  };