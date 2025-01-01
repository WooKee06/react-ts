import { useFormik } from 'formik'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { addProduct } from '../store/reducers/productsSlice' // импортируем действие

// Схема валидации с использованием Yup
const validationSchema = Yup.object({
	title: Yup.string().required('Заголовок не может быть пустым'),
	info: Yup.string().required('Описание не может быть пустым'),
})

export const AddPostForm: FC = () => {
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			title: '',
			info: '',
		},
		validationSchema, // Подключаем схему валидации
		onSubmit: values => {
			const newProduct = {
				id: Date.now(),
				title: values.title,
				description: values.info,
				liked: false,
			}
			dispatch(addProduct(newProduct))
			formik.resetForm() // Сбрасываем форму после отправки
		},
	})

	return (
		<form onSubmit={formik.handleSubmit}>
			<div>
				<input
					type='text'
					name='title'
					placeholder='Заголовок'
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.title && formik.errors.title && (
					<span className='error'>{formik.errors.title}</span>
				)}
			</div>

			<div>
				<input
					type='text'
					name='info'
					placeholder='Описание'
					value={formik.values.info}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.info && formik.errors.info && (
					<span className='error'>{formik.errors.info}</span>
				)}
			</div>

			<button type='submit'>Добавить Продукт</button>
		</form>
	)
}
