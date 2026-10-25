import Image from "next/image";
import Link from "next/link";
import medibridgeThumbnail from "../../assets/thumbnails/light/medibridge-project-thumbnail.png";
import bulkAirtimeThumbnail from "../../assets/thumbnails/light/bulk-airtime-project-thumbnail.png";
import styles from "./projects.module.css";

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
			<div className={styles.gallery}>
				{projects.map((project) => (
					<Link key={project.href} href={project.href} className={styles.galleryProject}>
						<Image
							src={project.image}
							alt={`${project.name} project preview`}
							className={styles.galleryImage}
						/>
						<p className={styles.galleryName}>{project.name}</p>
						<p className={styles.projectDescription}>{project.description}</p>
					</Link>
				))}
			</div>
		</section>
	);
}
