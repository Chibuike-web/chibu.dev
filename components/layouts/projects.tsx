import Image from "next/image";
import Link from "next/link";
import medibridgeThumbnail from "../../assets/thumbnails/light/medibridge-project-thumbnail.png";
import bulkAirtimeThumbnail from "../../assets/thumbnails/light/bulk-airtime-project-thumbnail.png";

const projects = [
	{
		href: "/medibridge",
		name: "Medibridge",
		description: "Healthcare management system",
		image: medibridgeThumbnail,
	},
	{
		href: "/bulk-airtime",
		name: "Bulk Airtime",
		description: "Mobile payments concept",
		image: bulkAirtimeThumbnail,
	},
] as const;

export function Projects() {
	return (
		<section data-enter="7" className="py-16" aria-labelledby="projects-heading">
			<h2 id="projects-heading" className="tight font-medium text-[1rem] text-foreground">
				Projects
			</h2>
			<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
				{projects.map((project) => (
					<Link
						key={project.href}
						href={project.href}
						className="group block min-w-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-foreground"
					>
						<Image
							src={project.image}
							alt={`${project.name} project preview`}
							className="block h-auto w-full rounded-xl shadow-(--project-image-shadow)"
						/>
						<p className="mt-4 text-[1rem] font-medium text-foreground underline-offset-3 group-hover:underline">
							{project.name}
						</p>
						<p className="mt-1 text-[0.875rem] text-pretty text-muted-foreground">
							{project.description}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
