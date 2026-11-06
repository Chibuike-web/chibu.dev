import "@blossom-carousel/react/style.css";
import Image from "next/image";
import Link from "next/link";
import { BlossomCarousel } from "@/components/ui/blossom-carousel";
import medibridgeThumbnail from "../../assets/thumbnails/light/medibridge-project-thumbnail.png";
import knowledgeCiThumbnail from "../../assets/thumbnails/light/knowledge-ci-project-thumbnail.png";

const projects = [
	{
		href: "/medibridge",
		name: "Medibridge",
		description: "Healthcare management system",
		image: medibridgeThumbnail,
	},
	{
		href: "/knowledge-ci",
		name: "Knowledge CI",
		description: "Content checks for Sanity Knowledge Bases",
		image: knowledgeCiThumbnail,
	},
] as const;

export function Projects() {
	return (
		<section data-enter="7" className="py-16" aria-labelledby="projects-heading">
			<h2 id="projects-heading" className="tight font-medium text-[1rem] text-foreground">
				Projects
			</h2>
			<BlossomCarousel className="-mb-4 mt-2 ml-[calc(50%-50vw)] flex! w-screen! max-w-none! snap-x gap-8 scroll-px-(--gutter) px-(--gutter) py-4 [--gutter:max(1rem,calc(50vw-19rem))] lg:[--gutter:calc(50vw-20rem)]">
				{projects.map((project) => (
					<Link
						key={project.href}
						href={project.href}
						className="group block w-[82vw] shrink-0 snap-start rounded-xl sm:w-76"
					>
						<Image
							src={project.image}
							width={1200}
							alt={`${project.name} project preview`}
							className="block h-auto w-full rounded-xl shadow-(--project-image-shadow)"
						/>
						<p className="mt-4 text-[1rem] font-medium text-foreground decoration-accent underline-offset-3 group-hover:underline">
							{project.name}
						</p>
						<p className="mt-1 text-[0.875rem] text-pretty text-muted-foreground">
							{project.description}
						</p>
					</Link>
				))}
			</BlossomCarousel>
		</section>
	);
}
