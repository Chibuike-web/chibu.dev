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
};

export default nextConfig;
