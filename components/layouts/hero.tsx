import { CopyEmailButton } from "@/components/copy-email-button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export function Hero() {
	return (
		<div>
			<div className="tight flex flex-col gap-2 pt-8 pb-10 font-medium text-muted-foreground text-pretty">
				<p data-enter="1">
					I design and build digital products with a strong focus on structure, usability, and
					craft.
				</p>
				<p data-enter="2">
					I work across product thinking, interface design, and frontend engineering, and I do my
					best work on complex workflows, data-heavy interfaces, and systems that need to feel simple
					without losing depth.
				</p>
				<p data-enter="3">
					Recently, I’ve been building{" "}
					<Link
						href="/medibridge"
						prefetch={true}
						className="link rounded border border-transparent"
					>
						Medibridge
					</Link>
					, a platform for managing and transferring patient records between hospitals. I designed
					and built all of it, from the workflows to the database.
				</p>
				<p data-enter="4">
					I’m currently looking for opportunities to work with teams building applied AI products
					and systems.
				</p>
			</div>
			<div data-enter="5" className="flex flex-wrap gap-x-3 gap-y-2">
				<CopyEmailButton />
				<HeroButton link="https://github.com/Chibuike-web">GitHub</HeroButton>
				<HeroButton link="https://www.linkedin.com/in/chibuike-maduabuchi/">LinkedIn</HeroButton>
				<HeroButton link="/chibuike-maduabuchi-resume.pdf">Resume</HeroButton>
			</div>
		</div>
	);
}

function HeroButton({ link, children }: { link: string; children: ReactNode }) {
	return (
		<a href={link} target="_blank" rel="noopener noreferrer" className="social-pill reveal-link">
			{children}
			<span className="reveal-link-icon" aria-hidden="true">
				<ArrowUpRight />
			</span>
		</a>
	);
}
