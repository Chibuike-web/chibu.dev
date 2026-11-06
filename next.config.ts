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
	async rewrites() {
		const wantsMarkdown = [
			{ type: "header" as const, key: "accept", value: "(.*)text/markdown(.*)" },
		];
		return {
			// The homepage is static and is served before afterFiles rewrites run, so this one must be in beforeFiles.
			beforeFiles: [{ source: "/", has: wantsMarkdown, destination: "/llms.txt" }],
			afterFiles: [{ source: "/index.md", destination: "/llms.txt" }],
			fallback: [{ source: "/:path*", has: wantsMarkdown, destination: "/not-found.md" }],
		};
	},
};

export default nextConfig;
