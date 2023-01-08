import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styles from './customBlockContent.module.scss'
import cn from 'classnames'
import {slugify} from 'utils/string'
import linkStyle from 'components/customLink/customLink.module.scss'

const BlockRenderer = props => {
	const {style = 'normal'} = props.node

	if (/^h\d/.test(style)) {
		// headings
		const level = style.replace(/[^\d]/g, '')
		return React.createElement(style, {className: cn(`hd-${parseInt(level) + 3}`, styles['h' + level], style === 'h2' && 'a-' + slugify(props.node.children[0].text))}, props.children)
	} else if (style === 'blockquote') {
		// blockquotes
		return <blockquote className={styles.blockquote}>{props.children}</blockquote>
	} else if (style === 'normal') {
		// paragraphs
		return <p className={`pm-xxs ${styles.p}`}>{props.children}</p>
	}

	return BlockContent.defaultSerializers.types.block(props)
}

const Fieldset = ({node}) => {
	return <span className={cn('pm-m', styles.fieldset)}>{node.text}</span>
}

const List = ({children}) => {
	return (
		<ul className={cn('pm-m', styles.list)}>
			{children}
		</ul>
	)
}

const serializers = {
	types: {
		block: BlockRenderer,
		fieldset: Fieldset,
	},
	list: List,
	marks: {
		link: ({mark, children}) => {
			if (mark._type === 'link') {
				return <a href={mark.href[0].url} target='_blank' rel='noopener noreferrer' className={linkStyle.customLink}>{children}</a>
			} else {
				return <></>
			}
		},
		class: ({mark, children}) => {
			return <span className={mark.class}>{children}</span>
		},
	},
}

const CustomBlockContent = ({blocks, className = null}) => {
	return (
		<>
			{blocks && (
				<div className={className}>
					<BlockContent blocks={blocks} serializers={serializers} />
				</div>
			)}
		</>
	)
}

export default CustomBlockContent
