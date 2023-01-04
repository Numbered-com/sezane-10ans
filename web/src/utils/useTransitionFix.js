import Router from 'next/router'
import {useCallback, useEffect, useRef} from 'react'

export const useTransitionFix = () => {
	const cleanupRef = useRef(() => {})

	useEffect(() => {
		const onBeforeHistoryChange = () => {
			const nodes = document.querySelectorAll('link[rel="stylesheet"][data-n-p]')

			for (const node of nodes) {
				node.removeAttribute('data-n-p')
			}

			cleanupRef.current = () => {
				for (const node of nodes) {
					// Remove previous page's styles after the transition has finalized.
					if (node.parentNode) {
						document.head.removeChild(node)
					}
				}
			}
		}

		Router.events.on('beforeHistoryChange', onBeforeHistoryChange)

		// media
		const mutationHandler = mutations => {
			mutations.forEach(({target}) => {
				if (target.nodeName === 'STYLE') {
					if (target.getAttribute('media') === 'x') {
						target.removeAttribute('media')
					}
				}
			})
		}

		const observer = new MutationObserver(mutationHandler)
		observer.observe(document.head, {
			subtree: true,
			attributeFilter: ['media'],
		})

		return () => {
			Router.events.off('beforeHistoryChange', onBeforeHistoryChange)
			cleanupRef.current()
			observer.disconnect()
		}
	}, [])

	// Return a fixed reference function that calls the internal cleanup reference.
	return useCallback(() => {
		cleanupRef.current()
	}, [])
}
