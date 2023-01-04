export const lerp = (a, b, t) => a * (1 - t) + t * b

export const clamp = (x, min, max) =>
	min < max
		? Math.min(Math.max(x, min), max)
		: Math.min(Math.max(x, max), min)

export const map = (n, start1, stop1, start2, stop2) =>
	clamp(
		(n - start1) / (stop1 - start1) * (stop2 - start2) + start2,
		start2, stop2,
	)
