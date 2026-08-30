"use client";

import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ProgressBar({
	items,
	initialState,
}: {
	items: Record<string, string>[];
	initialState?: string;
}) {
	const parsed = initialState === "false" ? false : true;

	const [activeSectionHeading, setActiveSectionHeading] = useState<string | undefined>(
		items[0].label,
	);
	const [activeSection, setActiveSection] = useState(0);
	const [isExpanded, setIsExpanded] = useState(parsed);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionIndex = items.findIndex((section) => section.id === entry.target.id);
						setActiveSection(sectionIndex);
						setActiveSectionHeading(items[sectionIndex].label);
					}
				});
			},
			{ threshold: 0.1 },
		);
		items.forEach((item) => {
			const section = document.getElementById(item.id);
			if (section) {
				observer.observe(section);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [items]);
	return (
		<div className="progress-mount fixed bottom-4 left-1/2 z-[100] w-[calc(100%_-_2rem)] max-w-[21.875rem] -translate-x-1/2 overflow-hidden rounded-3xl bg-[#464648] text-white">
			<button
				className="sticky top-0 z-10 flex w-full cursor-point items-center justify-between border border-transparent bg-[#464648] px-5 py-3 text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
				onClick={() => {
					setIsExpanded((prev) => {
						const next = !prev;
						document.cookie = `isExpandedValue=${next}; path=/; max-age=31536000; samesite=lax`;
						return next;
					});
				}}
			>
				<span>{activeSectionHeading}</span>
				<ChevronsUpDown className="size-4.5" />
			</button>
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, filter: "blur(0.25rem)", height: 0 }}
						animate={{ opacity: 1, filter: "blur(0)", height: "auto" }}
						exit={{ opacity: 0, filter: "blur(0.25rem)", height: 0 }}
						transition={{ duration: 0.15, ease: "linear" }}
						className="overflow-hidden"
					>
						<ul className="pb-2 px-2">
							{items.map((item, index) => {
								const isActive = index === activeSection;
								return (
									<li
										key={item.id}
										className={cn(
											"w-full rounded-full text-[0.75rem] hover:bg-white/10",
											isActive && "bg-white/15",
										)}
									>
										<button
										className="w-full cursor-pointer rounded-full border border-transparent p-3 text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
											onClick={() => {
												console.log("click");

												document.getElementById(item.id)?.scrollIntoView({
													behavior: "smooth",
												});
											}}
										>
											{item.label}
										</button>
									</li>
								);
							})}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
