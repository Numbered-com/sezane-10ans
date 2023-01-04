// @ts-nocheck
import create from 'zustand'

export const useCartStore = create(set => ({
	products: [],
	addProduct: (product) => set(state => ({products: [...state.products, product]})),
	removeProduct: (product) => set(state => {
		const indexToRemove = state.products.indexOf(state.products.filter(p => p._id === product._id)[0])
		if (indexToRemove !== -1) {
			return {products: state.products.filter((p, index) => index !== indexToRemove)}
		}
	}),
	setProduct: (product) => set(state => {
		const indexToModify = state.products.indexOf(state.products.filter(p => p._id === product._id)[0])
		if (indexToModify !== -1) {
			state.products[indexToModify] = product
			return {products: state.products}
		}
	}),
}))

export default useCartStore
