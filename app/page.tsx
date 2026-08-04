import type { Metadata } from "next";
import { Footer } from "@/components/layouts/footer";
import { Hero } from "@/components/layouts/hero";
import { Navbar } from "@/components/layouts/navbar";
import { Projects } from "@/components/layouts/projects";

export const metadata: Metadata = {
	title: "Chibuike Maduabuchi - Design Engineer",
	description:
		"Chibuike Maduabuchi builds AI-driven systems and high-trust digital products. Selected work across design engineering, product design, and frontend development.",
	openGraph: {
		title: "Chibuike Maduabuchi - Design Engineer",
		description: "AI systems, design engineering, and product-focused frontend work.",
		url: "https://chibuike-maduabuchi.vercel.app",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: "Chibuike Maduabuchi - Design Engineer",
		description: "AI systems, design engineering, and product-focused frontend work.",
		images: ["/og-image.png"],
	},
};

export default function Home() {
	return (
		<main className="page-shell">
			<Navbar />
			<Hero />
			<Projects />
			<Footer />
		</main>
	);
}
