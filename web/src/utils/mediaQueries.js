const desktopWidth = 1024

export const isDesktopWidth = () => window.matchMedia(`(min-width: ${desktopWidth}px)`).matches
