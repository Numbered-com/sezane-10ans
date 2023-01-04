import {animated} from '@react-spring/web'
import Button, {ButtonVariant} from 'components/button/Button'
import Locale from 'components/locale/Locale'
import ProductCard, {ProductCardVariant} from 'components/productCard/ProductCard'
import useCartStore from 'stores/useCartStore'
import {cn} from 'utils/classnames'
import styles from './miniCart.module.scss'

const MiniCart = ({style, onSubmit}) => {
	const {products} = useCartStore(state => ({
		products: state.products,
	}))

	const handleSubmit = (e) => {
		e.preventDefault()

		if (onSubmit && products.length === 3) onSubmit()
	}

	return (
		<animated.form className={styles.miniCart} onSubmit={handleSubmit} style={style}>
			<div className='container'>
				<h2 className={cn('hd-4', styles.title)}><Locale>Votre sélection</Locale></h2>
				<ul className={styles.list}>
					{products.map(product => (
						<ProductCard key={`cart-${product._id}`} {...product} variant={ProductCardVariant.small} />
					))}
					{Array(3 - products.length).fill().map((e, i) => <ProductCard key={`cart-${i}`} variant={ProductCardVariant.small} empty />)}
				</ul>
				<Button type='submit' variant={ButtonVariant.rect} className={styles.button} disabled={products.length !== 3}><Locale>Valider</Locale></Button>
			</div>
		</animated.form>
	)
}

export default MiniCart
