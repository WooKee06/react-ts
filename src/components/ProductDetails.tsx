import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../store'

const ProductDetails: FC = () => {
	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>()
	const product = useSelector(
		(state: RootState) => state.products.products.find(p => p.id === Number(id)) // обращаемся к массиву products
	)

	if (!product) {
		return <div>Продукт не найден</div>
	}

	const BackBtn = () => {
		navigate(-1)
	}

	return (
		<div className='product-item'>
			<button onClick={BackBtn}>
				Назад{' '}
				<svg
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M2.87 7.74985L4.84 9.71985C4.91369 9.78851 4.97279 9.87131 5.01378 9.96331C5.05477 10.0553 5.07681 10.1546 5.07859 10.2553C5.08037 10.356 5.06184 10.4561 5.02412 10.5494C4.9864 10.6428 4.93026 10.7277 4.85904 10.7989C4.78782 10.8701 4.70299 10.9262 4.6096 10.964C4.51621 11.0017 4.41618 11.0202 4.31548 11.0184C4.21477 11.0167 4.11546 10.9946 4.02346 10.9536C3.93146 10.9126 3.84866 10.8535 3.78 10.7798L0.53 7.52985L0 6.99985L0.53 6.46985L3.78 3.21985C3.92217 3.08737 4.11022 3.01524 4.30452 3.01867C4.49882 3.0221 4.68421 3.10081 4.82162 3.23822C4.95903 3.37564 5.03775 3.56102 5.04117 3.75532C5.0446 3.94963 4.97248 4.13767 4.84 4.27985L2.87 6.24985H12.75C13.612 6.24985 14.4386 6.59226 15.0481 7.20175C15.6576 7.81124 16 8.63789 16 9.49985C16 10.3618 15.6576 11.1884 15.0481 11.7979C14.4386 12.4074 13.612 12.7498 12.75 12.7498H10.75C10.5511 12.7498 10.3603 12.6708 10.2197 12.5302C10.079 12.3895 10 12.1988 10 11.9998C10 11.8009 10.079 11.6102 10.2197 11.4695C10.3603 11.3289 10.5511 11.2498 10.75 11.2498H12.75C13.2141 11.2498 13.6592 11.0655 13.9874 10.7373C14.3156 10.4091 14.5 9.96398 14.5 9.49985C14.5 9.03572 14.3156 8.5906 13.9874 8.26241C13.6592 7.93422 13.2141 7.74985 12.75 7.74985H2.87Z'
						fill='black'
					/>
				</svg>
			</button>
			<img src={product.image} alt='' width={300} />
			<h1>{product.title}</h1>
			<p>{product.description}</p>
		</div>
	)
}

export default ProductDetails
