import Image from "next/image";
import Link from "next/link";
import medibridgeThumbnail from "../../assets/thumbnails/light/medibridge-thumbnail.webp";
import nombaThumbnail from "../../assets/thumbnails/light/nomba-thumbnail.webp";

const projects = [
	{
		href: "/nomba",
		name: "Nomba",
		description: "Bulk Airtime Transfer",
		image: nombaThumbnail,
	},
	{
		href: "/medibridge",
		name: "Medibridge",
		description: "AI-Powered healthcare management system",
		image: medibridgeThumbnail,
	},
] as const;

export function Projects() {
	return (
		<div className="mount-4 py-22">
			<h1 className="tight font-medium text-[1rem] text-foreground">Projects</h1>
			<div className="group/projects w-full flex flex-col gap-4 pt-10 md:flex-row md:items-center">
				{projects.map((project) => (
					<Link
						key={project.href}
						href={project.href}
						prefetch={true}
						className="relative w-full overflow-hidden active:scale-[1] rounded-3xl border border-border bg-surface-muted p-1.5 transition-all duration-200 ease-out group-hover/projects:opacity-35 hover:scale-[1.02] hover:!opacity-100 focus-visible:!opacity-100 md:flex-1 focus-visible:border-muted-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
					>
						<div className="relative aspect-[367/350] w-full overflow-hidden rounded-[1.125rem] bg-background">
							<Image
								src={project.image}
								alt={`${project.name} project preview`}
								fill
								sizes="(max-width: 47.9375rem) 100vw, 50vw"
								className="w-full"
								loading="eager"
							/>
							<div className="project-thumbnail-overlay relative z-10 flex h-full w-full flex-col p-4">
								<p className="mt-auto text-[1rem] font-medium text-foreground">{project.name}</p>
								<p className="font-medium text-muted-foreground">{project.description}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
