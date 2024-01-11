import React, { ChangeEvent, FC } from 'react';
import './App.css';
import { AddPostForm } from './components/AddPostForm';
import Post from './models/Post'
import DisplayPosts from './components/DisplayPost';



const App: FC = () => {
  const [Modal, setModal] = React.useState<boolean>(false)
  const [PostList, SetPostList] = React.useState<Post[]>([])
  const [searchPost, setSearchPost] = React.useState('')

  const AddPost = (NewPost: Post) => {
    SetPostList([...PostList, NewPost])
  }
  const ApdatePost = (NewPost: Post) => {
    SetPostList(PostList.map((post) => (post.id === NewPost.id ? NewPost : post)))
  }
  const DeletPost = (id: number) => {
    const newPostList = PostList.filter(post => post.id !== id)
    SetPostList(newPostList)
  }


  console.log('post list >>', PostList)


  const OnClickOpenModal = () => {
    setModal(true)
  }
  const OnClickCloseModal = () => {
    setModal(false)
  }



  const SearchPostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchPost(e.target.value)
  }

  return (
      <div className="App">
        <button onClick={OnClickOpenModal}> New App! </button>
        <input
          placeholder='Поиск'
          value={searchPost}
          onChange={SearchPostChange}
        />
        <AddPostForm Modal={Modal} OnClickCloseModal={OnClickCloseModal} AddPost={AddPost} />
        <DisplayPosts
          PostList={PostList}
          Modal={Modal}
          searchPost={searchPost}
          ApdatePost={ApdatePost}
          DeletPost={DeletPost}
          OnClickCloseModal={OnClickCloseModal}
        />
      </div>
  );
}

export default App;
