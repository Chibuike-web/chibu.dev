import Image from "next/image";
import Link from "next/link";
import medibridgeThumbnail from "../../assets/thumbnails/light/medibridge-project-thumbnail.png";
import nombaThumbnail from "../../assets/thumbnails/light/nomba-project-thumbnail.png";
import styles from "./projects.module.css";

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
		<section data-enter="7" className="py-16" aria-labelledby="projects-heading">
			<h2 id="projects-heading" className="tight font-medium text-[1rem] text-foreground">
				Projects
			</h2>
			<div className={styles.gallery}>
				{projects.map((project) => (
					<Link key={project.href} href={project.href} className={styles.galleryProject}>
						<Image
							src={project.image}
							alt={`${project.name} project preview`}
							className={styles.galleryImage}
							sizes="(max-width: 639px) calc(100vw - 32px), 344px"
						/>
						<p className={styles.galleryName}>{project.name}</p>
						<p className={styles.projectDescription}>{project.description}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
