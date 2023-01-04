import defaultResolve from 'part:@sanity/base/document-actions'
import {useEffect, useState} from 'react'

export default function resolveDocumentActions (props) {
	const [isPublishing, setIsPublishing] = useState(false)

	useEffect(() => {
		// we make sure a slug is defined on post publication
		if (isPublishing && !props.draft) {
			if (props.published) {
				setIsPublishing(false)
			}
		} else if (!isPublishing && props.draft) {
			setIsPublishing(true)
		}
	}, [props.draft])

	return defaultResolve(props)
}
