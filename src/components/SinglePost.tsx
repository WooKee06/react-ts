import React, { FC } from 'react'
import Post from '../models/Post'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { EditPostForm } from './EditPostForm';

interface DisplayPostsProps {
  post: Post;
  Modal: boolean
  OnClickCloseModal: () => void
  ApdatePost: (NewPost: Post) => void
  DeletPost: (id: number) => void
}

export const SinglePost: FC<DisplayPostsProps> = ({ post, DeletPost, ApdatePost, OnClickCloseModal, Modal }) => {
  const [edit, setEdit] = React.useState<boolean>(false)


  const HandleToogleEdit = () => {
    setEdit(!edit)
  }

  const HandleToogleDelit = () => {
    DeletPost(post.id)
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.info}</p>
      <MdEdit onClick={HandleToogleEdit} />
      <MdDelete onClick={HandleToogleDelit} />


      {edit ? <EditPostForm
        HandleToogleEdit={HandleToogleEdit}
        ApdatePost={ApdatePost}
        Modal={Modal}
        OnClickCloseModal={OnClickCloseModal}
        data={post} /> : null
      }

    </div>
  )
}
