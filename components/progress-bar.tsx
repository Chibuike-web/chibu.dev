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
	return document.cookie.split("; ").includes("isExpandedValue=true");
}

function getServerSnapshot(): boolean | null {
	return null;
}

function setSectionsExpanded(expanded: boolean) {
	document.cookie = `isExpandedValue=${expanded}; path=/; max-age=31536000; samesite=lax`;
	window.dispatchEvent(new Event(expandedChangeEvent));
}

export default function ProgressBar({ items }: { items: Record<string, string>[] }) {
	const isExpanded = useSyncExternalStore<boolean | null>(
		subscribe,
		getExpandedSnapshot,
		getServerSnapshot,
	);

	const [activeSectionHeading, setActiveSectionHeading] = useState<string | undefined>(
		items[0].label,
	);
	const [activeSection, setActiveSection] = useState(0);
	const toggleRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		let observer: IntersectionObserver | undefined;

		const observeSections = () => {
			observer?.disconnect();
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const sectionIndex = items.findIndex((section) => section.id === entry.target.id);
							setActiveSection(sectionIndex);
							setActiveSectionHeading(items[sectionIndex].label);
						}
					});
				},
				{
					rootMargin: `0px 0px -${document.documentElement.clientHeight * 0.8}px 0px`,
					threshold: 0,
				},
			);
			for (const item of items) {
				const section = document.getElementById(item.id);
				if (section) {
					observer.observe(section);
				}
			}
		};

		observeSections();
		window.addEventListener("resize", observeSections);

		return () => {
			observer?.disconnect();
			window.removeEventListener("resize", observeSections);
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

	if (isExpanded === null) return null;

	return (
		<nav
			aria-label="Case study sections"
			className="progress-mount fixed bottom-4 left-1/2 z-[100] w-[calc(100%_-_2rem)] max-w-85 -translate-x-1/2 overflow-hidden rounded-3xl bg-background text-foreground shadow-lg ring-1 ring-border dark:bg-[#464648] dark:text-white dark:shadow-none dark:ring-0"
		>
			<button
				className="sticky top-0 z-10 flex w-full cursor-pointer items-center justify-between gap-3 border border-transparent h-10 bg-background px-5 dark:bg-[#464648] text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
				aria-expanded={isExpanded}
				ref={toggleRef}
				onClick={() => setSectionsExpanded(!isExpanded)}
			>
				<span className="flex min-w-0 items-center gap-2.5">
					<ProgressRing />
					<span className="sr-only">Sections, current: </span>
					<span className="truncate">{activeSectionHeading}</span>
				</span>
				<ChevronsUpDown className="size-4 shrink-0" />
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
										"w-full rounded-full text-sm hover:bg-surface-hover dark:hover:bg-white/10",
										isActive && "bg-surface-muted dark:bg-white/15",
									)}
								>
									<button
										aria-current={isActive ? "location" : undefined}
										className="flex h-9 w-full cursor-pointer items-center rounded-full border border-transparent px-3 text-left focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
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
