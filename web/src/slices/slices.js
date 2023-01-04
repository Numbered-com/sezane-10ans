
const components = {
}

const Slices = ({slices}) => {
	if (slices) {
		return (
			<>
				{slices.map((slice, i) => {
					const Component = components[slice._type]
					if (Component) return <Component key={i} {...slice} prevSlice={i && slices[i - 1]._type} nextSlice={i < slices.length - 1 && slices[i + 1]._type} />
					else return <></>
				})}
			</>
		)
	}
}

export default Slices
