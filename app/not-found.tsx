import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { BackToHome } from "@/components/layouts/back-to-home";
import { MissingPath } from "@/components/missing-path";

export const metadata: Metadata = {
	title: "Page not found",
};

const links = [
	{ href: "/", label: "Home" },
	{ href: "/medibridge", label: "Medibridge" },
	{ href: "/bulk-airtime", label: "Bulk Airtime" },
] as const;

export default function NotFound() {
	return (
		<main className="page-shell case-study-page">
			<nav className="flex items-center justify-between">
				<BackToHome />
			</nav>
			<section className="mt-16 flex flex-col gap-6 md:mt-22">
				<p className="font-medium tight text-muted-foreground">404</p>
				<div className="flex flex-col gap-3">
					<p className="font-medium tight text-muted-foreground">Recipient</p>
					<span className="inline-flex h-9 w-fit max-w-full items-center gap-1.5 rounded-full bg-red-muted px-3 font-medium text-red">
						<span className="truncate">
							<MissingPath />
						</span>
						<X className="size-4 shrink-0" aria-hidden="true" />
					</span>
					<p className="font-medium tight text-red">This link isn’t a valid page.</p>
				</div>
				<p className="font-medium tight text-muted-foreground text-pretty">
					It moved or never existed. Pick a valid recipient instead.
				</p>
				<div className="flex flex-wrap gap-x-3 gap-y-2">
					{links.map(({ href, label }) => (
						<Link key={href} href={href} className="social-pill reveal-link">
							{label}
							<span className="reveal-link-icon" aria-hidden="true">
								<ArrowUpRight />
							</span>
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
