import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	logging: { fetches: { fullUrl: true } },
	reactCompiler: true,
	cacheComponents: true,
	partialPrefetching: true,
	experimental: { optimizePackageImports: ["lucide-react"], turbopackRustReactCompiler: true },
	reactStrictMode: true,
	typedRoutes: true,
	images: { deviceSizes: [640, 750, 828, 1080, 1250, 1920, 2400, 3840] },
	async redirects() {
		return [{ source: "/medibridge", destination: "/orta", permanent: true }];
	},
	async headers() {
		return [
			{
				source: "/",
				headers: [
					{
						key: "Link",
						value:
							'</sitemap.xml>; rel="sitemap", </index.md>; rel="alternate"; type="text/markdown"',
					},
				],
			},
			{
				source: "/orta",
				headers: [
					{
						key: "Link",
						value:
							'</sitemap.xml>; rel="sitemap", </orta.md>; rel="alternate"; type="text/markdown"',
					},
				],
			},
			{
				source: "/knowledge-ci",
				headers: [
					{
						key: "Link",
						value:
							'</sitemap.xml>; rel="sitemap", </knowledge-ci.md>; rel="alternate"; type="text/markdown"',
					},
				],
			},
		];
	},
	async rewrites() {
		const wantsMarkdown = [
			{ type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
		];
		return {
			// These pages are static and are served before afterFiles rewrites run, so their rewrites must be in beforeFiles.
			beforeFiles: [
				{ source: "/", has: wantsMarkdown, destination: "/index.md" },
				{ source: "/orta", has: wantsMarkdown, destination: "/orta.md" },
				{ source: "/knowledge-ci", has: wantsMarkdown, destination: "/knowledge-ci.md" },
			],
			fallback: [{ source: "/:path*", has: wantsMarkdown, destination: "/not-found.md" }],
		};
	},
};

export default nextConfig;
