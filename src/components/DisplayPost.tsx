import React, { FC } from 'react';
import Post from '../models/Post';
import { SinglePost } from './SinglePost';

interface DisplayPostsProps {
  PostList: Post[];
  Modal: boolean
  OnClickCloseModal: () => void
  ApdatePost: (NewPost: Post) => void
  DeletPost: (id: number) => void
  searchPost: string
}

const DisplayPosts: FC<DisplayPostsProps> =
  ({ PostList, ApdatePost, DeletPost, OnClickCloseModal, Modal, searchPost }) => {
    return (
      <div className="container">
        {
          PostList.filter((obj) => {
            return obj.title.includes(searchPost)
          }).map((post) => {
            return (
              
              <SinglePost
                DeletPost={DeletPost}
                ApdatePost={ApdatePost}
                Modal={Modal}
                OnClickCloseModal={OnClickCloseModal}
                key={post.id}
                post={post} />
            )
          }).reverse()
        }
      </div>
    )
  }

export default DisplayPosts;