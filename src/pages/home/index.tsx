import { ChangeEvent, FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../components/ProductList'
import { Product } from '../../models/Product'
import { AppDispatch, RootState } from '../../store'
import {
	deleteProduct,
	fetchProducts,
	toggleLike,
	updateProduct,
} from '../../store/reducers/productsSlice'

const Home: FC = () => {
	const dispatch = useDispatch<AppDispatch>()

	const [searchPost, setSearchPost] = useState('')
	const [filter, setFilter] = useState<'all' | 'favorites'>('all')
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

	// Пагинация
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 8
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage

	const { products } = useSelector((state: RootState) => state.products)
	console.log(products)
	const handleToggleLike = (id: number) => {
		dispatch(toggleLike(id))
	}

	const handleDeleteProduct = (id: number) => {
		dispatch(deleteProduct(id))
	}

	const handleOpenEditModal = (product: Product) => {
		setSelectedProduct(product)
	}

	const handleCloseEditModal = () => {
		setSelectedProduct(null)
	}

	const handleUpdatePost = (updatedProduct: Product) => {
		dispatch(updateProduct(updatedProduct))
		handleCloseEditModal()
	}

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchPost(e.target.value)
	}

	const handlePageChange = (selected: { selected: number }) => {
		setCurrentPage(selected.selected + 1) // Корректировка индекса
	}

	const filteredProducts = products
		.filter(product => {
			if (filter === 'favorites') {
				return product.liked
			}
			return true
		})
		.filter(product =>
			product.title.toLowerCase().includes(searchPost.toLowerCase())
		)

	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])

	return (
		<div className='home'>
			<h1>Список продуктов</h1>
			<input
				placeholder='Поиск'
				className='searchInput'
				value={searchPost}
				onChange={handleSearchChange}
			/>

			<div className='filter-btn-list'>
				<button className='filter-btn' onClick={() => setFilter('all')}>
					Все
				</button>
				<button className='filter-btn' onClick={() => setFilter('favorites')}>
					Избранное
				</button>
			</div>

			<ProductList
				products={currentProducts}
				handleToggleLike={handleToggleLike}
				handleDeleteProduct={handleDeleteProduct}
				handleOpenEditModal={handleOpenEditModal}
				selectedProduct={selectedProduct}
				handleCloseEditModal={handleCloseEditModal}
				handleUpdatePost={handleUpdatePost}
				searchPost={searchPost}
			/>

			<div className='pagination'>
				<ReactPaginate
					pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
					pageRangeDisplayed={5}
					marginPagesDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName='pagination'
					activeClassName='active'
					previousLabel='«'
					nextLabel='»'
				/>
			</div>
		</div>
	)
}

export default Home
