import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface Product {
	id: number
	title: string
	description: string
	liked: boolean
	image: string
}

const initialState: {
	products: Product[]
	loading: boolean
	error: string | null
} = {
	products: [],
	loading: false,
	error: null,
}

// Асинхронный запрос для получения данных из API
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await axios.get('https://fakestoreapi.com/products')
		return response.data.map((product: any) => ({
			id: product.id,
			title: product.title,
			description: product.description,
			image: product.image,
			liked: false,
		}))
	}
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		toggleLike(state, action) {
			const product = state.products.find(p => p.id === action.payload)
			if (product) product.liked = !product.liked
		},
		addProduct(state, action) {
			if (!state.products.some(product => product.id === action.payload.id)) {
				state.products.push(action.payload)
			}
		},
		deleteProduct(state, action) {
			state.products = state.products.filter(
				product => product.id !== action.payload
			)
		},
		updateProduct(state, action) {
			const productIndex = state.products.findIndex(
				p => p.id === action.payload.id
			)
			if (productIndex !== -1) {
				state.products[productIndex] = action.payload
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false

				state.products = action.payload
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch products'
			})
	},
})

export const { toggleLike, deleteProduct, addProduct, updateProduct } =
	productsSlice.actions
export default productsSlice.reducer
