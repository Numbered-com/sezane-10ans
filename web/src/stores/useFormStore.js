import create from 'zustand'

const useFormStore = create(set => ({
	senderName: null,
	senderEmail: null,
	setSenderInfo: ({name, email}) => set(() => ({senderName: name, senderEmail: email})),
}))

export default useFormStore
