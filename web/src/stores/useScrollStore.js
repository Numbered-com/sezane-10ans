import {useEffect} from 'react'
import create from 'zustand'

let intersectionCallbacks = []
let resizeCallbacks = []

export const useStore = create(set => ({
	isLocked: false,
	setIsLocked: value => set(() => ({isLocked: value})),

	observer: null,
	enabled: true,
	setEnabled: value => set(() => ({
		enabled: value,
	})),
	addObserverCallback: cb => {
		intersectionCallbacks.push(cb)
	},
	removeObserverCallback: cb => {
		const indexToRemove = intersectionCallbacks.indexOf(cb)
		if (indexToRemove !== -1) {
			intersectionCallbacks = intersectionCallbacks.filter((slice, index) => index !== indexToRemove)
		}
	},
	addResizeCallback: cb => {
		resizeCallbacks.push(cb)
	},
	removeResizeCallback: cb => {
		const indexToRemove = resizeCallbacks.indexOf(cb)
		if (indexToRemove !== -1) {
			resizeCallbacks = resizeCallbacks.filter((slice, index) => index !== indexToRemove)
		}
	},
}))

const useScrollStore = (createState = null) => {
	useEffect(() => {
		if (!useStore.getState().observer) {
			const resizeObserver = new ResizeObserver((entries, observer) => {
				resizeCallbacks.forEach(cb => {
					cb(entries[0])
				})
			})
			resizeObserver.observe(document.body)

			useStore.setState({
				resizeObserver,
				observer: new IntersectionObserver((entries, observer) => {
					intersectionCallbacks.forEach(cb => {
						cb(entries, observer)
					})
				}),
			})
		}
	}, [])

	return createState ? useStore(createState) : useStore
}

export default useScrollStore
