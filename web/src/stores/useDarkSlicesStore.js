import create from 'zustand'

const useDarkSlicesStore = create(set => ({
	darkSlices: [],
	addDarkSlice: ref => set(state => ({
		darkSlices: state.darkSlices.concat(ref),
	})),
	removeDarkSlice: ref => set(state => {
		const indexToRemove = state.darkSlices.indexOf(ref)

		if (indexToRemove !== -1) {
			const darkSlices = state.darkSlices.filter((slice, index) => index === indexToRemove)
			return {darkSlices}
		}

		return {darkSlices: state.darkSlices}
	}),
}))

export default useDarkSlicesStore
