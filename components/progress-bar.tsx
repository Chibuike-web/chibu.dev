"use client";

import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import ProgressRing from "@/components/progress-ring";

const expandedChangeEvent = "case-study-sections-change";

function subscribe(onChange: () => void) {
	window.addEventListener(expandedChangeEvent, onChange);
	return () => window.removeEventListener(expandedChangeEvent, onChange);
}

function getExpandedSnapshot() {
	return !document.cookie.split("; ").includes("isExpandedValue=false");
}

function getServerSnapshot() {
	return true;
}

function setSectionsExpanded(expanded: boolean) {
	document.cookie = `isExpandedValue=${expanded}; path=/; max-age=31536000; samesite=lax`;
	window.dispatchEvent(new Event(expandedChangeEvent));
}

export default function ProgressBar({ items }: { items: Record<string, string>[] }) {
	const isExpanded = useSyncExternalStore(subscribe, getExpandedSnapshot, getServerSnapshot);

	const [activeSectionHeading, setActiveSectionHeading] = useState<string | undefined>(
		items[0].label,
	);
	const [activeSection, setActiveSection] = useState(0);
	const toggleRef = useRef<HTMLButtonElement>(null);

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

	useEffect(() => {
		if (!isExpanded) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isExpanded) {
				setSectionsExpanded(false);
				toggleRef.current?.focus();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isExpanded]);

	return (
		<nav
			aria-label="Case study sections"
			className="progress-mount fixed bottom-4 left-1/2 z-[100] w-[calc(100%_-_2rem)] max-w-[21.875rem] -translate-x-1/2 overflow-hidden rounded-3xl bg-[#464648] text-white"
		>
			<button
				className="sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between border border-transparent bg-[#464648] px-5 py-3 text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
				aria-expanded={isExpanded}
				ref={toggleRef}
				onClick={() => setSectionsExpanded(!isExpanded)}
			>
				<span className="flex items-center gap-2.5">
					<ProgressRing />
					<span className="sr-only">Sections, current: </span>
					<span>{activeSectionHeading}</span>
				</span>
				<ChevronsUpDown className="size-4.5" />
			</button>
			<div
				inert={!isExpanded}
				className={cn(
					"grid transition-[grid-template-rows,opacity,filter] duration-150 ease-linear motion-reduce:transition-none",
					isExpanded
						? "grid-rows-[1fr] opacity-100 blur-0"
						: "grid-rows-[0fr] opacity-0 blur-[0.25rem]",
				)}
			>
				<div className="min-h-0 overflow-hidden">
					<ul className="pb-2 px-2">
						{items.map((item, index) => {
							const isActive = index === activeSection;
							return (
								<li
									key={item.id}
									className={cn(
										"w-full rounded-full text-sm hover:bg-white/10",
										isActive && "bg-white/15",
									)}
								>
									<button
										aria-current={isActive ? "location" : undefined}
										className="flex h-11 w-full cursor-pointer items-center rounded-full border border-transparent px-3 text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
										onClick={() => {
											const section = document.getElementById(item.id);
											section?.scrollIntoView();
											section?.focus({ preventScroll: true });
										}}
									>
										{item.label}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
}
