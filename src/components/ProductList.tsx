// components/ProductList.tsx
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../models/Product'
import { EditPostForm } from './EditPostForm'

interface ProductListProps {
	products: Product[]
	handleToggleLike: (id: number) => void
	handleDeleteProduct: (id: number) => void
	handleOpenEditModal: (product: Product) => void
	selectedProduct: Product | null
	handleCloseEditModal: () => void
	handleUpdatePost: (updatedProduct: Product) => void

	searchPost: String
}

const ProductList: FC<ProductListProps> = ({
	products,
	handleToggleLike,
	handleDeleteProduct,
	handleOpenEditModal,
	selectedProduct,
	handleCloseEditModal,
	handleUpdatePost,
	searchPost,
}) => {
	const navigate = useNavigate()

	return (
		<div className='product-list'>
			{products
				.filter(
					product =>
						product.title.toLowerCase().includes(searchPost.toLowerCase()) ||
						product.description.toLowerCase().includes(searchPost.toLowerCase())
				)
				.map(product => (
					<div key={product.id} className='product-card'>
						<div
							className='product-card-wrapper'
							onClick={e => {
								if ((e.target as HTMLElement).tagName !== 'BUTTON') {
									navigate(`/product/${product.id}`)
								}
							}}
						>
							<div
								className='img'
								style={{ backgroundImage: `url(${product.image})` }}
							></div>
							<h2>{product.title.slice(0, 15)}...</h2>
							<p>{product.description.slice(0, 40)}...</p>
							<div className='card-actions'>
								<button
									onClick={e => {
										e.stopPropagation()
										handleToggleLike(product.id)
									}}
									style={{ color: product.liked ? 'red' : 'black' }}
								>
									❤
								</button>
								<button onClick={e => handleDeleteProduct(product.id)}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M20 5C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7H19L18.997 7.071L18.064 20.142C18.0281 20.6466 17.8023 21.1188 17.4321 21.4636C17.0619 21.8083 16.5749 22 16.069 22H7.93C7.42414 22 6.93707 21.8083 6.56688 21.4636C6.1967 21.1188 5.97092 20.6466 5.935 20.142L5.002 7.072L5 7H4C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H20ZM14 2C14.2652 2 14.5196 2.10536 14.7071 2.29289C14.8946 2.48043 15 2.73478 15 3C15 3.26522 14.8946 3.51957 14.7071 3.70711C14.5196 3.89464 14.2652 4 14 4H10C9.73478 4 9.48043 3.89464 9.29289 3.70711C9.10536 3.51957 9 3.26522 9 3C9 2.73478 9.10536 2.48043 9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2H14Z'
											fill='black'
										/>
									</svg>
								</button>
								<button onClick={e => handleOpenEditModal(product)}>
									<svg
										width='14'
										height='14'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M5 15.9997L4 19.9997L8 18.9997L19.586 7.4137C19.9609 7.03864 20.1716 6.53003 20.1716 5.9997C20.1716 5.46937 19.9609 4.96075 19.586 4.5857L19.414 4.4137C19.0389 4.03876 18.5303 3.82812 18 3.82812C17.4697 3.82813 16.9611 4.03876 16.586 4.4137L5 15.9997Z'
											stroke='black'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
										<path d='M5 16L4 20L8 19L18 9L15 6L5 16Z' fill='black' />
										<path
											d='M15 6L18 9M13 20H21'
											stroke='black'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							</div>
						</div>
						{selectedProduct && selectedProduct.id === product.id && (
							<EditPostForm
								Modal={true}
								OnClickCloseModal={handleCloseEditModal}
								ApdatePost={handleUpdatePost}
								data={product}
								HandleToogleEdit={() => {}}
							/>
						)}
					</div>
				))}
		</div>
	)
}

export default ProductList
