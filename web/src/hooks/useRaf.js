import {useEffect} from 'react'

const callbacks = []
let request = null
let then = 0

const tick = (time) => {
	const elapsed = time - then
	const fpsInterval = 1000 / 60

	if (elapsed > fpsInterval) {
		then = time - (elapsed % fpsInterval)
		callbacks.forEach((cb) => {
			cb(elapsed)
		})
	}

	request = window.requestAnimationFrame(tick)
}

const useRaf = (callback, prio) => {
	useEffect(() => {
		if (prio) callbacks.unshift(callback)
		else callbacks.push(callback)

		if (!request) {
			then = 0
			request = window.requestAnimationFrame(tick)
		}

		return () => {
			const index = callbacks.indexOf(callback)
			if (index !== -1) callbacks.splice(index, 1)
			if (!callbacks.length) {
				window.cancelAnimationFrame(request)
				request = null
			}
		}
	}, [callback, prio])
}

export default useRaf
