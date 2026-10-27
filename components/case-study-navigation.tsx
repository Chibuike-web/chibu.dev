import ProgressBar from "@/components/progress-bar";
import { ChevronsUpDown } from "lucide-react";

export function CaseStudyNavigation({ items }: { items: { id: string; label: string }[] }) {
	return (
		<>
			<ProgressBar items={items} />
			<noscript>
				<nav
					aria-label="Case study sections"
					className="native-case-study-nav fixed bottom-4 left-1/2 z-[100] w-[calc(100%_-_2rem)] max-w-85 -translate-x-1/2 rounded-3xl bg-background text-foreground shadow-lg ring-1 ring-border dark:bg-[#464648] dark:text-white dark:shadow-none dark:ring-0"
				>
					<details>
						<summary className="flex h-10 cursor-pointer list-none items-center justify-between rounded-3xl border border-transparent px-5">
							Sections
							<ChevronsUpDown className="size-4" aria-hidden="true" />
						</summary>
						<ul className="max-h-[60vh] overflow-y-auto px-2 pb-2">
							{items.map((item) => (
								<li key={item.id}>
									<a
										href={`#${item.id}`}
										className="flex h-9 items-center rounded-full px-3 text-sm hover:bg-surface-hover dark:hover:bg-white/10"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</details>
				</nav>
			</noscript>
		</>
	);
}
