import React, { ChangeEvent, FC } from 'react'
import Post from '../models/Post'



interface EditPostFormProps {
  Modal: boolean
  OnClickCloseModal: () => void
  data: Post
  ApdatePost: (NewPost: Post) => void
  HandleToogleEdit: () => void
}




export const EditPostForm: FC<EditPostFormProps> = ({ HandleToogleEdit, OnClickCloseModal, ApdatePost, Modal, data }) => {
  const [editPost, setEditPost] = React.useState<Post>(data)


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handel change  >>>', e.target);


    const { title, info } = editPost

    if (title && info) {
      ApdatePost(editPost)
      HandleToogleEdit()
    }
  };


  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditPost({
      ...editPost,
      [name]: value
    })
  }





  return (
    <form style={{ display: `${Modal ? 'block' : 'none'}` }} onSubmit={handleSubmit}>
      <input
        value={editPost.title}
        onChange={HandleChange}
        placeholder='Заголовок'
        name='title'
      />
      <input
        value={editPost.info}
        onChange={HandleChange}
        placeholder='описание'
        name='info'
      />
      <button onClick={OnClickCloseModal}>x</button>
      <br />
      <button>Подтвердить</button>
    </form>
  )
}
