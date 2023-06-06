const sanityClient = require('@sanity/client')

const options = {
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qoj23imy',
	dataset: process.env.NEXT_PUBLIC_SANITY_API_DATASET || 'production',
	useCdn: false,
	apiVersion: '2021-10-04',
	token: process.env.SANITY_API_TOKEN,
}

module.exports.client = sanityClient(options)
module.exports.cdnClient = sanityClient({...options, token: null, useCdn: true})
