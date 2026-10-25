import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return ["", "/medibridge", "/bulk-airtime"].map((path) => ({
		url: `https://chibu.dev${path}`,
	}));
}
