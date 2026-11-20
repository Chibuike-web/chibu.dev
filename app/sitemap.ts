import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: "https://chibu.dev", lastModified: "2026-11-06" },
		{ url: "https://chibu.dev/orta", lastModified: "2026-11-20" },
		{ url: "https://chibu.dev/knowledge-ci", lastModified: "2026-11-06" },
	];
}
