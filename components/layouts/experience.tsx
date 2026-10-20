import { ArrowUpRight } from "lucide-react";

const experience = [
	{
		start: "2026",
		end: "Present",
		title: "Design Engineer at Roboto Studio",
		href: "https://robotostudio.com",
		description:
			"Currently building web experiences with React, Next.js, TypeScript, and Sanity. Translating Figma designs into reusable interfaces with a focus on accessibility, motion, and performance.",
	},
	{
		start: "2024",
		end: "2026",
		title: "Design Engineer / Product Engineer — Self-employed",
		href: null,
		description:
			"Designed and built web applications end to end, including Medibridge’s patient onboarding, records management, and hospital transfers. Created reusable components, forms, dashboards, and validation flows.",
	},
	{
		start: "2024",
		end: "2025",
		title: "Product Designer at Kulipal Technologies Limited",
		href: null,
		description:
			"Designed mobile and web experiences across food, events, housing, and branch management. Led user research and the Branch Management feature, partnering with developers on accessible, responsive interfaces.",
	},
] as const;

export function Experience() {
	return (
		<section data-enter="6" className="pt-16" aria-labelledby="experience-heading">
			<h2 id="experience-heading" className="tight text-[1rem] font-medium text-foreground">
				Work Experience
			</h2>
			<div className="mt-6 grid gap-8">
				{experience.map((role) => (
					<div key={role.title} className="grid gap-3 sm:grid-cols-[120px_1fr] sm:gap-4">
						<p className="whitespace-nowrap text-sm font-normal text-muted-foreground">
							{role.start} — {role.end}
						</p>
						<div>
							<h3 className="font-medium text-foreground">
								{role.href ? (
									<a
										href={role.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 rounded underline decoration-transparent underline-offset-3 transition-[text-decoration-color] duration-150 hover:decoration-current focus-visible:decoration-current focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring motion-reduce:transition-none"
									>
										{role.title}
										<ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
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
