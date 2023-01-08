import {useEffect} from 'react'
import useAppStore from 'stores/useAppStore'

export function useScroll (callback, deps = []) {
	const lenis = useAppStore(({lenis}) => lenis)

	useEffect(() => {
		const handleScroll = (args) => {
			callback({...args, scrollY: args.scroll})
		}

		if (!lenis) return
		lenis.on('scroll', handleScroll)
		lenis.notify()

		return () => {
			lenis.off('scroll', handleScroll)
		}
	}, [lenis, callback, [...deps]])
}
