import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: "https://chibu.dev", lastModified: "2026-11-05" },
		{ url: "https://chibu.dev/medibridge", lastModified: "2026-11-02" },
		{ url: "https://chibu.dev/knowledge-ci", lastModified: "2026-11-02" },
		{ url: "https://chibu.dev/bulk-airtime", lastModified: "2026-11-02" },
	];
}
