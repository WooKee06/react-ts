import { FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
	return (
		<header>
			<div className='logo'>Wookee</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Главная</Link>
					</li>
					<li>
						<Link to='/addproduct'>Создать продукт</Link>
					</li>
				</ul>
			</nav>
			<button>Telegram</button>
		</header>
	)
}

export default Header
