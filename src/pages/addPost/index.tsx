import { FC } from 'react'
import { AddPostForm } from '../../components/AddPostForm'

const AddPost: FC = () => {
	return (
		<div className='home'>
			<h1>Создание продукта</h1>
			<AddPostForm />
		</div>
	)
}

export default AddPost
