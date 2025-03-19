const crypto = require("crypto");

module.exports = {
	async headers() {
		const nonce = crypto.randomBytes(16).toString("base64");
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
						  default-src 'self';
						  script-src 'self' 'nonce-${nonce}';
						  style-src 'self' 'nonce-${nonce}';
						  img-src 'self' data: https:;
						  font-src 'self' https://fonts.gstatic.com;
						  object-src 'none';
						  base-uri 'self';
						  frame-src 'self' https:;
						  report-uri /csp-report;
						`,
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
				],
			},
		];
	},
	images: {
		domains: ["bydmetromobile.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bydmetromobile.com",
				pathname: "/**",
			},
		],
	},
};
