import useWindowEvent from './useWindowEvent'

const useWindowResize = (cb, triggerInit = false, useEffectProps = [], debounceDelay = 300) => useWindowEvent('resize', cb, triggerInit, useEffectProps, debounceDelay)

export default useWindowResize
