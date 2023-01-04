import {CloudinaryImage} from 'components/image/Image'
import Checkbox from 'components/checkbox/Checkbox'
import styles from './productCard.module.scss'
import {cn} from 'utils/classnames'
import {useEffect, useRef, useState} from 'react'
import useCartStore from 'stores/useCartStore'
import Locale from 'components/locale/Locale'
import Button from 'components/button/Button'

export const ProductCardVariant = {
	large: 'large',
	small: 'small',
}

const ProductCard = (props) => {
	const {variant = ProductCardVariant.large, title, image, price, _id, empty, sizes} = props
	const [checked, setChecked] = useState(Boolean(useCartStore.getState().products.filter(p => p._id === _id)[0]))
	const checkboxRef = useRef(null)
	const [size, setSize] = useState(null)
	const [index, setIndex] = useState(0)

	const handleClick = () => {
		if (!empty) {
			const state = useCartStore.getState()
			const isChecked = checkboxRef && checkboxRef.current && checkboxRef.current.checked

			if (isChecked || variant === 'small') {
				state.removeProduct(props)
			} else if (state.products.length < 3) {
				state.addProduct({...props, size})
			}
		}
	}

	const handleClickSizes = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	const handleClickSize = (e) => {
		const value = e.currentTarget.textContent
		if (size !== value) {
			setSize(e.currentTarget.textContent)
			useCartStore.getState().setProduct({...props, size: value})
		} else {
			setSize(null)
		}
	}

	useEffect(() => useCartStore.subscribe(
		state => {
			if (!empty) {
				const product = state.products.filter(p => p._id === _id)[0]
				if (product) setIndex(state.products.indexOf(product) + 1)
				setChecked(!!product)
			}
		},
	), [])

	const imageProps = variant === ProductCardVariant.large ? {
		width: 206,
		height: 295,
		desktopWidth: 206,
		mobileWidth: 122,
	} : {
		width: 50,
		height: 71,
		desktopWidth: 39,
		mobileWidth: 39,
	}
	return (
		<li className={cn(styles.productCard, styles[variant], empty && styles.isEmpty)} onClick={handleClick}>
			{!empty && (
				<figure>
					<CloudinaryImage
						src={image}
						className={styles.image}
						{...imageProps} />
					<figcaption>
						{variant === ProductCardVariant.large && sizes?.length > 1 && (
							<div className={cn('hm-4', 'hd-4', styles.sizes, checked && styles.isVisible)} onClick={handleClickSizes}>
								<span><Locale>Choisissez votre taille</Locale></span>
								<ul>
									{sizes.map((item) => (
										<li key={item._id}>
											<Button
												className={cn('hm-4 hd-4', styles.sizeButton, styles.button, size === item.title && styles.isSelected)}
												onClick={handleClickSize}>
												{item.title}
											</Button>
										</li>
									))}
								</ul>
							</div>
						)}
						{variant === ProductCardVariant.large && (
							<>
								<Checkbox name='selected' value={_id} id={_id} ref={checkboxRef} checked={checked} variant={variant === ProductCardVariant.small && 'gold'} />
								<h2 className={cn('hm-5', 'hd-5', styles.title)}>{title} — {price}</h2>
							</>
						)}
					</figcaption>
					{variant === ProductCardVariant.large && (
						<div className={cn('hm-1', styles.number, checked && styles.isVisible)}>
							<img src={`/la-liste/images/number-${index}.png`} alt='' />
						</div>
					)}
				</figure>
			)}
		</li>
	)
}

export default ProductCard
