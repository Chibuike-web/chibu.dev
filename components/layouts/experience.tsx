const experience = [
	{
		start: "Aug 2026",
		end: "Present",
		title: "Design Engineer at Roboto Studio",
		href: "https://robotostudio.com",
		description:
			"Design and build production web experiences with React, Next.js, and TypeScript. Translate Figma designs into reusable interfaces, develop Sanity content models and Studio customisations, and refine motion, accessibility, and performance.",
	},
	{
		start: "Dec 2024",
		end: "Aug 2026",
		title: "Design Engineer / Product Engineer — Self-employed",
		href: null,
		description:
			"Designed and built applications end to end, including MediBridge’s AI-assisted onboarding, structured patient records, and hospital-to-hospital transfers. Created reusable components, forms, dashboards, and validation flows.",
	},
	{
		start: "Jan 2024",
		end: "May 2025",
		title: "Product Designer at Kulipal Technologies Limited",
		href: null,
		description:
			"Designed mobile and web experiences across food, events, housing, and branch management. Conducted user research and usability testing, created Figma wireframes and prototypes, and led the Branch Management feature. Collaborated with frontend developers on responsive, accessible interfaces, web pages, and email notifications.",
	},
] as const;

export function Experience() {
	return (
		<section data-enter="6" className="pt-16" aria-labelledby="experience-heading">
			<h2 id="experience-heading" className="tight text-[1rem] font-medium text-foreground">
				Experience
			</h2>
			<div className="mt-6 grid gap-8">
				{experience.map((role) => (
					<div key={role.title} className="grid gap-3 sm:grid-cols-[140px_1fr] sm:gap-5">
						<p className="whitespace-nowrap text-xs leading-5 text-muted-foreground">
							{role.start} — {role.end}
						</p>
						<div>
							<h3 className="font-medium text-foreground">
								{role.href ? (
									<a
										href={role.href}
										target="_blank"
										rel="noopener noreferrer"
										className="rounded focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
									>
										{role.title}
									</a>
								) : (
									role.title
								)}
							</h3>
							<p className="mt-1 text-sm text-muted-foreground text-pretty">{role.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
