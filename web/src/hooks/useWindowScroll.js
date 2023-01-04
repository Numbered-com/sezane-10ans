import useWindowEvent from './useWindowEvent'

/**
 * Returns a function that accepts a callback to be performed when the window scrolls.
 * Please note: the callback is not debounced, to improve performances check `useDebouncedCallback`;
 *
 * ### Usage:
 *
 * ```jsx harmony
 * const MyComponent = () => {
 *   const onWindowScroll = useWindowScroll();
 *
 *   onWindowScroll(() => console.log('Window is scrolling...'));
 *
 *   return (<div />)
 * }
 * ```
 */
const useWindowScroll = (cb, triggerInit = false, useEffectProps = [], debounceDelay = 0) => useWindowEvent('scroll', cb, triggerInit, useEffectProps, debounceDelay)

export default useWindowScroll
