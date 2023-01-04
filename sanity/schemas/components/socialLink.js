import {FaFacebookSquare, FaTwitter, FaInstagram, FaSnapchatGhost, FaFlipboard, FaYoutube, FaTumblr, FaLinkedin} from 'react-icons/fa'

const SOCIAL_ICON = [
	['facebook', FaFacebookSquare],
	['twitter', FaTwitter],
	['instagram', FaInstagram],
	['snapchat', FaSnapchatGhost],
	['flipboard', FaFlipboard],
	['youtube', FaYoutube],
	['tumblr', FaTumblr],
	['linkedin', FaLinkedin],
]

const getSocialIcon = url => (SOCIAL_ICON.find(icon => url?.includes(icon[0])) || [])[1]

export default {
	name: 'socialLink',
	title: 'Social Link',
	type: 'object',
	fields: [
		{
			type: 'string',
			name: 'title',
			title: 'Title',
			validation: Rule => Rule.required(),
		},
		{
			type: 'url',
			name: 'url',
			title: 'URL',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'title',
			url: 'url',
		},
		prepare: ({title, url}) => ({
			title,
			subtitle: url,
			media: getSocialIcon(url),
		}),
	},
}
