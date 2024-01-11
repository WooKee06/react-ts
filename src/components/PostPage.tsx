import React, { FC } from 'react'
import Post from '../models/Post'


interface DisplayPostsProps {
  post: Post;
}


export const PostPage : FC<DisplayPostsProps> = ({post}) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.info}</p>
    </div>
  )
}
