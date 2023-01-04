import {
	useEffect,
} from 'react'
import debounce from 'utils/debounce'

/**
 * We ensure there's only one event of each type
 */
export const events = {}
export const data = {
	pageYOffset: 0,
	innerWidth: 0,
	innerHeight: 0,
	documentHeight: 0,
	offsetWidth: 0,
}

/**
 * Mapping event
 * Because window events are unik, we can add
 * intensive getters to the returned event.
 */
const map = (e) => {
	switch (e.type) {
		case 'scroll':
			if (e.target) data.pageYOffset = window.pageYOffset

			e.pageYOffset = data.pageYOffset
			break
		case 'resize':
			if (e.target || !data.innerWidth) {
				data.innerWidth = window.innerWidth
				data.innerHeight = window.innerHeight
				data.documentHeight = document.documentElement.clientHeight
				data.offsetWidth = document.body.offsetWidth
			}

			e.innerWidth = data.innerWidth
			e.innerHeight = data.innerHeight
			e.documentHeight = data.documentHeight
			e.offsetWidth = data.offsetWidth
			break
		case 'blur':
		case 'focus':
			break
	}

	return e
}

const useWindowEvent = (eventName, cb, triggerInit = false, useEffectProps = [], debounceDelay = 300) => {
	useEffect(() => {
		const debounceCb = debounce(cb, debounceDelay)

		if (debounceCb && eventName) {
			if (events[eventName]) {
				events[eventName].cbs.push(debounceCb)
				if (triggerInit) {
					cb(map({type: eventName}))
				}
			} else {
				const event = {cbs: [debounceCb]}
				event.cb = (e) => {
					const m = map(e)
					event.cbs.forEach(ecb => {
						ecb(m)
					})
				}

				window.addEventListener(eventName, event.cb)
				events[eventName] = event
				if (triggerInit) {
					cb(map({type: eventName}))
				}
			}
		}

		return () => {
			// cleanup event
			if (eventName) {
				const event = events[eventName]
				if (event) {
					const index = event.cbs.indexOf(debounceCb)
					if (index !== -1) {
						event.cbs.splice(index, 1)
						if (event.cbs.length === 0) {
							window.removeEventListener(eventName, event.cb)
							events[eventName] = null
						}
					}
				}
			}
		}
	}, [eventName, ...useEffectProps])
}

export default useWindowEvent
