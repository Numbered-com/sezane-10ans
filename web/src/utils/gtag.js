export const GA_TRACKING_ID = ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
	if (window.gtag) {
		window.gtag('config', GA_TRACKING_ID, {
			page_path: url,
			anonymize_ip: true,
			forceSSL: true,
		})
	}
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
	window.gtag('event', action, {
		event_category: category,
		event_label: label,
		value: value,
		anonymize_ip: true,
		forceSSL: true,
	})
}
