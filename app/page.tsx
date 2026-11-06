import type { Metadata } from "next";
import { Footer } from "@/components/layouts/footer";
import { Experience } from "@/components/layouts/experience";
import { Hero } from "@/components/layouts/hero";
import { Navbar } from "@/components/layouts/navbar";
import { Projects } from "@/components/layouts/projects";

export const metadata: Metadata = {
	title: "Chibuike Maduabuchi - Design Engineer",
	alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
	description:
		"Chibuike Maduabuchi is a design engineer who designs and builds digital products, with a focus on complex workflows, data-heavy interfaces, and healthcare software.",
};

export default function Home() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Chibuike Maduabuchi",
		url: "https://chibu.dev",
		image: "https://chibu.dev/profile.png",
		jobTitle: "Design Engineer",
		knowsAbout: [
			"Design engineering",
			"Product design",
			"Interface design",
			"Frontend engineering",
			"Product engineering",
		],
		description:
			"Design engineer who designs and builds digital products, with a focus on complex workflows, data-heavy interfaces, and healthcare software.",
		email: "mailto:chibuikemaduabuchi2023@gmail.com",
		worksFor: {
			"@type": "Organization",
			name: "Roboto Studio",
			url: "https://robotostudio.com",
		},
		sameAs: ["https://github.com/Chibuike-web", "https://www.linkedin.com/in/chibuike-maduabuchi/"],
	};

	return (
		<main className="page-shell home-page">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
			/>
			<Navbar />
			<Hero />
			<Experience />
			<Projects />
			<Footer />
		</main>
	);
}
