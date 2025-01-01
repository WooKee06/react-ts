import { FC } from 'react'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.scss'
import ProductDetails from './components/ProductDetails'

import Layout from './layout'
import AddPost from './pages/addPost'
import Home from './pages/home'
import store from './store'
const App: FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className='App'>
					<Layout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/addproduct' element={<AddPost />} />
							<Route path='/product/:id' element={<ProductDetails />} />
						</Routes>
					</Layout>
				</div>
			</Router>
		</Provider>
	)
}

export default App
