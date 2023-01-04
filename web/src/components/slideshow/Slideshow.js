import {useEffect, useRef} from 'react'
import styles from './slideshow.module.scss'
import {cn} from 'utils/classnames'
import useWindowResize from 'hooks/useWindowResize'
import useDebouncedCallback from 'hooks/useDebouncedCallback'

const Slideshow = ({children, active = true, groupCells = 1, ratioLandscape = null, ratioPortrait = null, className = null}) => {
	const ref = useRef(null)
	const flickityRef = useRef(null)
	// const [buttonState, setButtonState] = useState(-1)

	const flickityOptions = useRef({
		prevNextButtons: false,
		pageDots: false,
		// wrapAround: items.length > 3,
		resize: false,
		// contain: true,
		cellAlign: 'left',
		// groupCells: true
	})

	// const onPrev = () => {
	// 	flickityRef.current.previous()
	// }

	// const onNext = () => {
	// 	flickityRef.current.next()
	// }

	useEffect(() => {
		// const onChange = (index) => {
		// 	setButtonState(index === 0 ? -1 : index === items.length - 1 ? 1 : 0)
		// }

		const Flickity = require('flickity')
		flickityRef.current = new Flickity(ref.current, flickityOptions.current)
		// flickityRef.current.on('change', onChange)
		flickityRef.current.resize()
	}, [])

	useWindowResize(useDebouncedCallback(() => {
		flickityRef.current.resize()
	}, 200), true)

	return (
		<div className={cn(styles.wrapper, styles['wrapper' + groupCells], active && styles['is-active'], className)}>
			<div className={styles.flickityWrapper}>
				<div
					ref={ref}
					className={cn(styles.flickity, 'flickityCells' + groupCells)}>
					{children}
				</div>
				{/* <Button className={cn('flickity-button', 'flickity-previous', styles.btn, styles.btnPrev)} disabled={buttonState === -1} type='button' onClick={onPrev} label={locale('Précédent')} />
				<Button className={cn('flickity-button', 'flickity-next', styles.btn, styles.btnNext)} disabled={buttonState === 1} type='button' onClick={onNext} label={locale('Suivant')} /> */}
			</div>
			<style jsx global>{`
				.flickity-enabled {
					position: relative;
				}
				.flickity-enabled:focus {
					outline: none;
				}
				.flickity-viewport {
					position: relative;
					width: 100%;
					height: 100%;
					outline: none;
				}
				.flickity-slider {
					position: absolute;
					width: 100%;
					height: 100%;
					outline: none
				}
				.flickity-enabled.is-draggable {
					user-select: none
				}
				.flickity-viewport .flickity-slider > div {
					cursor: grab
				}
				.flickity-viewport.is-pointer-down .flickity-slider > div {
					cursor: grabbing
				}
				.flickity-viewport .flickity-slider > .is-selected {
					cursor: pointer;
				}
				.flickity-page-dots {
					display: flex;
					position: absolute;
					bottom: 3rem;
					left: 50%;
					transform: translateX(-50%);
				}
				.dot {
					width: 1rem;
					height: 1rem;
					border: 1px solid #141759;
					border-radius: 50%;
					margin: 0 0.4rem;
					transition: background 0.4s ease-out;
					will-change: transform;
				}
				.dot.is-selected {
					background: #141759;
				}
			`}
			</style>
		</div>
	)
}

export default Slideshow
