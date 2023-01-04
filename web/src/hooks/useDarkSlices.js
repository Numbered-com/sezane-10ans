import {useEffect} from 'react'
import shallow from 'zustand/shallow'
import useDarkSlicesStore from 'stores/useDarkSlicesStore'

/**
 * Register a slice so elements can change contrast accordingly
 * @param {*} ref
 * @returns {[]} state list of slices
 */
const useDarkSlices = (ref) => {
	const [darkSlices, addDarkSlice, removeDarkSlice] = useDarkSlicesStore(state => [state.darkSlices, state.addDarkSlice, state.removeDarkSlice], shallow)

	useEffect(() => {
		const localRef = ref?.current
		if (localRef) {
			addDarkSlice(localRef)

			return () => {
				removeDarkSlice(localRef)
			}
		}
	}, [ref, addDarkSlice, removeDarkSlice])

	return darkSlices || []
}

export default useDarkSlices
