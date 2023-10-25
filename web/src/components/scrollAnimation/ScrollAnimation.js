import useScrollRatio from 'hooks/useScrollRatio'
import {precision} from 'lib/lenis/maths'
import {useRef, forwardRef} from 'react'

const ScrollAnimation = (
	{
		children,
		speed,
		x,
		y,
		offset = [
			[0.5, 0.5],
			[1, 0],
		],
		rotateInit = 0,
		rotate = 0,
		className,
		ease = 1,
		easingFunction = value => value,
		transform,
		as = 'div',
		scrollRef,
	},
	ref,
) => {
	const localRef = useRef(null)
	const Tag = as
	const setRefs = (e) => {
		localRef.current = e
		if (ref) ref.current = e
	}

	const angle = useRef(rotateInit)
	const _x = useRef(0)
	const _y = useRef(0)
	const prevX = useRef(null)
	const prevY = useRef(null)
	const needsUpdate = useRef(false)
	const needsClean = useRef(false)

	useScrollRatio(
		scrollRef || localRef,
		(ratio, {easing, scrollY, top, height, viewport, originalRatio}) => {
			const initY = top - scrollY
			_x.current = ratio * (x !== undefined ? x : speed !== undefined ? speed * viewport.height : 0)
			_y.current = ratio * (y !== undefined ? y : speed !== undefined ? speed * viewport.height : 0)

			if (rotate || rotateInit) {
				const destRotation = (-rotate * initY) / viewport.height + rotateInit
				angle.current += (destRotation - angle.current) * easing
			}

			const t = {
				x: precision(_x.current),
				y: precision(_y.current),
				rotate,
			}

			const newY = initY + t.y

			const inView = (newY + height >= 0 && newY <= viewport.height) || (initY + height >= 0 && initY <= viewport.height)

			const rotateTransformation = angle.current ? ` rotate(${angle.current}deg)` : ''
			const props = {
				ratio,
				originalRatio,
				ref: localRef,
				top,
				height,
				viewport,
				inView,
				enabled: false,
			}

			if (localRef.current && inView && (t.x !== prevX.current || t.y !== prevY.current || needsUpdate.current)) {
				localRef.current.style.transform = transform
					? transform(t, {...props, enabled: true})
					: `translate3d(${t.x}px,${t.y}px,0)${rotateTransformation}`
				localRef.current.style.willChange = 'transform'
				needsUpdate.current = false
				needsClean.current = true
			} else if (localRef.current && !inView && needsClean.current) {
				localRef.current.style.transform = transform
					? transform(t, props)
					: `translate(${t.x}px,${t.y}px)${rotateTransformation}`
				localRef.current.style.willChange = ''
				needsClean.current = false
			}

			prevX.current = t.x
			prevY.current = t.y
		},
		{offset, ease, easingFunction},
		[speed, x, y, transform, easingFunction, ease],
	)

	return (
		<Tag ref={setRefs} className={className}>
			{children}
		</Tag>
	)
}

export default forwardRef(ScrollAnimation)
