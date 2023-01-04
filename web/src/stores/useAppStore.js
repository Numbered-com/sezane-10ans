// @ts-nocheck
import create from 'zustand'

const useAppStore = create(set => ({
	windowSize: {width: 0, height: 0},
	scrollbarWidth: 0,
	scrollbarEnabled: true,
	setScrollbarEnabled: value => set(() => ({
		scrollbarEnabled: value,
	})),
}))

export default useAppStore
