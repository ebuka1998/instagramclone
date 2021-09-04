CREATE TABLE users (
    user_id BIGSERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone_number VARCHAR(30),
    user_password VARCHAR NOT NULL,
    bio VARCHAR(200),
    gender VARCHAR(10),
    profile_picture TEXT DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
CREATE TABLE posts (
    post_id BIGSERIAL NOT NULL PRIMARY KEY,
    created_by BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    post_image TEXT NOT NULL,
    post_description TEXT ,
    comments_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    like_id BIGSERIAL NOT NULL PRIMARY KEY,
    postliked_id BIGINT REFERENCES posts(post_id) ON DELETE CASCADE NOT NULL ,
    userthatliked_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL 
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  comment TEXT,
  name VARCHAR,
  user_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  post_id BIGINT REFERENCES posts(post_id) ON DELETE CASCADE NOT NULL,
  parent_id INTEGER REFERENCES comments(comment_id)
);

CREATE TABLE follows(
    follow_id BIGSERIAL NOT NULL PRIMARY KEY,
    follower_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    followed_id BIGINT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    following_followed_id BOOLEAN DEFAULT FALSE
);

