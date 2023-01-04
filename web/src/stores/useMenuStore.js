import create from 'zustand'
import {useStore as useScrollStore} from './useScrollStore'

const useMenuStore = create(set => ({
	isMenuOpen: false,
	setIsMenuOpen: value => set(() => {
		useScrollStore.setState({isLocked: value})
		return ({isMenuOpen: value})
	}),
}))

export default useMenuStore
