import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return ["", "/medibridge", "/nomba"].map((path) => ({
		url: `https://chibu.dev${path}`,
	}));
}
