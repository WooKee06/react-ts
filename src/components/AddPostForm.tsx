import React, { ChangeEvent, FC } from 'react'
import Post from '../models/Post'



interface SetModalProps {
  Modal: boolean
  OnClickCloseModal: () => void
  AddPost: (NewPost: Post) => void
}

const initialState = {
  title: '',
  info: ''
}


export const AddPostForm: FC<SetModalProps> = ({ Modal, OnClickCloseModal, AddPost }) => {
  const [NewPost, setNewPost] = React.useState<{ title: string, info: string }>(initialState)


  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('handel change  >>>', e.target);


    const { title, info } = NewPost

    if (title && info) {
      AddPost({
        id: Date.now(),
        title,
        info,
      })
      setNewPost(initialState)
    }
  };


  const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPost({
      ...NewPost,
      [name]: value
    })
  }





  return (
    <form style={{ display: `${Modal ? 'block' : 'none'}` }} onSubmit={handleSubmit}>
      <input
        value={NewPost.title}
        onChange={HandleChange}
        placeholder='Заголовок'
        name='title'
      />
      <input
        value={NewPost.info}
        onChange={HandleChange}
        placeholder='описание'
        name='info'
      />
      <button onClick={OnClickCloseModal}>x</button>
      <br />
      <button>Добавить Пост</button>
    </form>
  )
}
