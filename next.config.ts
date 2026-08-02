import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	logging: { fetches: { fullUrl: true } },
	reactCompiler: true,
	cacheComponents: true,
	partialPrefetching: true,
	experimental: { optimizePackageImports: ["lucide-react"], turbopackRustReactCompiler: true },
	reactStrictMode: true,
	typedRoutes: true,
};

export default nextConfig;
