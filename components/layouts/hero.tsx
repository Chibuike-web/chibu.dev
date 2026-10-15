import { EmailIcon } from "@/icons/email-icon";
import { GithubIcon } from "@/icons/github-icon";
import { LinkedinIcon } from "@/icons/linkedin-icon";
import { ResumeIcon } from "@/icons/resume-icon";
import Link from "next/link";
import { ReactNode } from "react";

export function Hero() {
	return (
		<div>
			<div className="tight flex flex-col gap-2 pt-8 pb-10 font-medium text-muted-foreground text-pretty">
				<p data-enter="1">
					I’m a <span className="text-foreground">design engineer</span>. I design and build digital
					products with a strong focus on structure, usability, and craft.
				</p>
				<p data-enter="2">
					I work across product thinking, interface design, and frontend engineering, with a focus
					on complex workflows, data-heavy interfaces, and systems that need to feel simple without
					losing depth.
				</p>
				<p data-enter="3">
					Recently, I’ve been building{" "}
					<Link
						href="/medibridge"
						prefetch={true}
						className="link rounded border border-transparent focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
					>
						MediBridge
					</Link>
					, a platform for managing and transferring patient records between hospitals. I designed
					the workflows, structured the system, and built the frontend from the ground up.
				</p>
				<p data-enter="4">
					I’m currently looking for opportunities to work with thoughtful teams building ambitious
					products.
				</p>
			</div>
			<div data-enter="5" className="flex flex-wrap gap-x-3 gap-y-2">
				<HeroButton link="mailto:chibuikemaduabuchi2023@gmail.com">
					<EmailIcon className="shrink-0" /> <span className="font-semibold">Mail</span>
				</HeroButton>
				<HeroButton link="https://github.com/Chibuike-web">
					<GithubIcon className="shrink-0" /> <span className="font-semibold">Github</span>
				</HeroButton>
				<HeroButton link="https://www.linkedin.com/in/chibuike-maduabuchi/">
					<LinkedinIcon className="shrink-0" />
					<span className="font-semibold">Linkedin</span>
				</HeroButton>
				<HeroButton link="https://drive.google.com/file/d/1lB6mPhuiRfdUAimr9VTGugW6r2dQsEvZ/view?usp=sharing">
					<ResumeIcon className="size-4 shrink-0" />
					<span className="font-semibold ">Resume</span>
				</HeroButton>
			</div>
		</div>
	);
}

function HeroButton({ link, children }: { link: string; children: ReactNode }) {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="flex min-h-10 items-center gap-2 rounded-full border border-transparent bg-surface-muted px-4 py-1.5 text-foreground transition-[background-color,scale] duration-150 ease-out hover:bg-surface-hover active:scale-96 focus-visible:border-muted-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
		>
			{children}
		</a>
	);
}
