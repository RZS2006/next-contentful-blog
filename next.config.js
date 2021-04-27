module.exports = {
	images: {
		domains: ['images.ctfassets.net'],
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/posts',
				permanent: true,
			},
		];
	},
};
