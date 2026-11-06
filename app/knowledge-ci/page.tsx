import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import { BackToHome } from "@/components/layouts/back-to-home";
import { LoopVideo } from "@/components/loop-video";
import { ZoomableImageGroup } from "@/components/zoomable-image-group";
import { cn } from "@/lib/utils";
import { ArrowUpLeft } from "lucide-react";
import runningLight from "@/assets/knowledge-ci/running-light.webp";
import runningDark from "@/assets/knowledge-ci/running-dark.webp";
import decisionLight from "@/assets/knowledge-ci/decision-light.webp";
import decisionDark from "@/assets/knowledge-ci/decision-dark.webp";
import askLight from "@/assets/knowledge-ci/ask-light.webp";
import askDark from "@/assets/knowledge-ci/ask-dark.webp";
import settingsLight from "@/assets/knowledge-ci/settings-light.webp";
import settingsDark from "@/assets/knowledge-ci/settings-dark.webp";

import { CaseStudyNavigation } from "@/components/case-study-navigation";

export const metadata: Metadata = {
	title: "Knowledge CI",
	alternates: { canonical: "/knowledge-ci" },
	description:
		"How I designed and built Knowledge CI, a Sanity Studio tool that rebuilds a Knowledge Base after every publish and shows editors which conflicts need a decision.",
	openGraph: {
		url: "/knowledge-ci",
		siteName: "Chibuike Maduabuchi",
		type: "article",
	},
	twitter: {
		card: "summary_large_image",
	},
};

const headingClass = "font-medium tight text-balance";
const bodyClass = "font-medium tight text-muted-foreground text-pretty";
const screenImages = [
	{
		src: runningLight,
		darkSrc: runningDark,
		alt: "Knowledge CI checks screen with a run on step 3 of 4, rebuilding changed pages, above the open conflicts",
	},
	{
		src: decisionLight,
		darkSrc: decisionDark,
		alt: "Conflict card for snake plant pet safety showing what the document says and asking whether to use it",
	},
	{
		src: askLight,
		darkSrc: askDark,
		alt: "Ask tab with a chat answering questions from the Knowledge Base and suggested questions above the input",
	},
	{
		src: settingsLight,
		darkSrc: settingsDark,
		alt: "Settings dialog on the Agents section showing the MCP endpoint and setup for Claude Code, Cursor, and Codex",
	},
];

const navItems = [
	{
		id: "overview",
		label: "Overview",
	},
	{
		id: "checks",
		label: "Checks",
	},
	{
		id: "decisions",
		label: "Decisions",
	},
	{
		id: "ask-and-settings",
		label: "Ask and Settings",
	},
];

function ThemedVideo({
	name,
	label,
	siblingIndex,
}: {
	name: string;
	label: string;
	siblingIndex: number;
}) {
	return (
		<CaseStudyReveal
			siblingIndex={siblingIndex}
			className="w-full mb-6 rounded-xl ring ring-surface-hover isolate"
		>
			<div className="flex dark:hidden">
				<LoopVideo
					src={`/videos/${name}-light.mp4`}
					poster={`/videos/${name}-light.webp`}
					width={800}
					height={450}
					label={label}
				/>
			</div>
			<div className="hidden dark:flex">
				<LoopVideo
					src={`/videos/${name}-dark.mp4`}
					poster={`/videos/${name}-dark.webp`}
					width={800}
					height={450}
					label={label}
				/>
			</div>
		</CaseStudyReveal>
	);
}

export default function KnowledgeCiPage() {
	return (
		<main className="page-shell case-study-page">
			<CaseStudyReveal as="nav" className="flex items-center justify-between">
				<BackToHome />
			</CaseStudyReveal>
			<CaseStudyReveal
				as="header"
				siblingIndex={1}
				className="mt-16 mb-8 md:mt-22 flex flex-col gap-3"
			>
				<h1 id="overview" className="text-[1.125rem] font-semibold tight text-balance">Knowledge CI</h1>
				<p className="text-[1rem] font-medium text-muted-foreground text-balance tight no-line-height">
					Content checks for Sanity Knowledge Bases
				</p>
			</CaseStudyReveal>
			<section className="mb-22 flex flex-col gap-6">
				<CaseStudyReveal as="p" siblingIndex={2} className="font-medium tight text-pretty">
					Knowledge CI keeps a Sanity Knowledge Base in step with the content it was built from.
					After every publish it refreshes and rebuilds the Knowledge Base, cleans up the issues
					Sanity files, and shows editors what needs a decision.
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={3} className="flex flex-col gap-3">
					<h2 className={headingClass}>Why I built it</h2>
					<p className={bodyClass}>
						A Knowledge Base is a compiled summary of a site’s content, and AI agents answer from
						that summary. Picture a shop that changes its returns policy from 30 days to 14 and
						publishes. The site updates at once. The Knowledge Base keeps saying 30 days, and so
						does the agent, until a customer complains.
					</p>
					<p className={bodyClass}>
						I built this to answer one question after every content change: do the entries agents
						read still match the content?
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className="flex flex-col gap-3">
					<h2 className={headingClass}>My role</h2>
					<p className={bodyClass}>
						Design Engineer. I designed and built it, from the Sanity webhook and the backend run to
						the Studio screen. The recordings use a rebuilt interface with sample data.
					</p>
				</CaseStudyReveal>
			</section>
			<section id="checks" tabIndex={-1} className="outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Checks
				</CaseStudyReveal>
				<ThemedVideo
					name="knowledge-ci-checks"
					siblingIndex={1}
					label="Silent screen recording of Knowledge CI: browsing conflicts and warnings, viewing hidden issues and the check history, then running a check that finds a new conflict."
				/>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-3")}>
					Publishing starts a check. A Sanity webhook tells the backend what changed, and the
					backend waits for 60 seconds with no new changes, so a burst of edits becomes one run.
					Each run spends several minutes waiting on Sanity, so it runs as a durable workflow on
					Vercel’s Workflow Development Kit.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-3")}>
					A run always rebuilds before it judges anything. A refresh alone leaves the entries as
					they were, so in testing a correct edit from 1pm to 3pm came back as a critical conflict
					until the build caught up.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" className={bodyClass}>
					Sanity’s issue list needed cleaning before anyone could act on it. Its open issue count
					came back as 0 with 7 open and 10 with 13 open, old issues stayed open quoting text that
					was gone from the entry, and one build raised the same fact twice. So Knowledge CI counts
					the list itself, merges duplicates, and marks an issue stale when its quote has gone.
				</CaseStudyReveal>
			</section>
			<section id="decisions" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Decisions
				</CaseStudyReveal>
				<ThemedVideo
					name="knowledge-ci-decision"
					siblingIndex={1}
					label="Silent screen recording of Knowledge CI: the chat calls snake plants safe for cats, a check finds the conflict, an editor uses the document, and the chat now says they are toxic."
				/>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-3")}>
					The first version led with the list of runs. Editors want to know what’s wrong with their
					content, so the screen now opens with one line saying whether the Knowledge Base can be
					trusted, followed by the conflicts that need a decision. Each conflict shows the two
					claims side by side, so you can see exactly what disagrees.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-3")}>
					Which claim is true is a person’s call, so Knowledge CI never decides. An administrator
					picks a claim or dismisses the conflict, then confirms, and Sanity follows that choice in
					every later build.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={bodyClass}>
					Sanity doesn’t catch everything. In a test store with 7 planted contradictions, it flagged
					5 and resolved the other 2 on its own during the build, with no warning. So an empty list
					doesn’t prove the content is right, and catching those cases was the next step.
				</CaseStudyReveal>
			</section>
			<section id="ask-and-settings" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Ask and Settings
				</CaseStudyReveal>
				<ThemedVideo
					name="knowledge-ci-settings"
					siblingIndex={1}
					label="Silent screen recording of Knowledge CI: the settings sections and agent setup, then the rejected token, all clear, and first run states."
				/>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-3")}>
					The Ask tab is a chat over the Knowledge Base, so an editor can see what an agent would
					say. In the Decisions recording it calls snake plants safe for cats, then says they’re
					toxic once the conflict is settled. Checks never use an AI model. The chat is built to use
					the team’s own Vercel AI Gateway key.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-6")}>
					Settings holds the Sanity token, the AI key, and MCP setup for Claude Code, Cursor, and
					Codex. Tokens stay encrypted on the backend, because anything kept in Studio reaches every
					Studio user.
				</CaseStudyReveal>
				<ZoomableImageGroup images={screenImages} width={2560} height={1600} />
			</section>
			<CaseStudyLink href="/medibridge" className="case-study-nav-card">
				<ArrowUpLeft className="size-6" />

				<div className="flex flex-col items-end gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Previous</p>
					<p className="text-foreground font-medium no-line-height">Medibridge</p>
				</div>
			</CaseStudyLink>
			<CaseStudyNavigation items={navItems} />
		</main>
	);
}
