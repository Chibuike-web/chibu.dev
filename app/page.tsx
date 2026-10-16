import type { Metadata } from "next";
import { Footer } from "@/components/layouts/footer";
import { Experience } from "@/components/layouts/experience";
import { Hero } from "@/components/layouts/hero";
import { Navbar } from "@/components/layouts/navbar";
import { Projects } from "@/components/layouts/projects";

export const metadata: Metadata = {
	title: "Chibuike Maduabuchi - Design Engineer",
	alternates: { canonical: "/" },
	description:
		"Chibuike Maduabuchi is a design engineer who designs and builds digital products, with a focus on complex workflows, data-heavy interfaces, and healthcare software.",
};

export default function Home() {
	return (
		<main className="page-shell home-page">
			<Navbar />
			<Hero />
			<Experience />
			<Projects />
			<Footer />
		</main>
	);
}
