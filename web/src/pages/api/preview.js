import {getDocumentById} from 'lib/api'
import {resolveUrl} from 'lib/resolveUrl'

export default async function preview (req, res) {
	// Check the secret and next parameters
	// This secret should only be known to this API route and the CMS
	if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) return res.status(401).json({message: 'Invalid token'})
	if (!req.query.id) return res.status(401).json({message: 'ID must be be set'})

	// Fetch the headless CMS to check if the provided `id` exists
	const page = await getDocumentById(req.query.id, true)

	// If the slug doesn't exist prevent preview mode from being enabled
	if (!page) {
		return res.status(401).json({message: 'Invalid slug'})
	}

	// Enable Preview Mode by setting the cookies
	res.setPreviewData({})

	// Redirect to the path from the fetched page
	// We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
	res.writeHead(307, {Location: resolveUrl(page._type, page.slug)})
	res.end()
}
