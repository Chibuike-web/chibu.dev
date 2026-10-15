"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

const viewport = { once: true, amount: "some" } as const;
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function caseStudyRevealProps(reducedMotion: boolean | null, siblingIndex = 0) {
	return {
		"data-case-reveal": "",
		initial: {
			opacity: 0,
			transform: reducedMotion ? "none" : "translateY(10px)",
		},
		whileInView: {
			opacity: 1,
			transform: reducedMotion ? "none" : "translateY(0px)",
			transition: {
				duration: reducedMotion ? 0.12 : 0.6,
				ease,
				delay: reducedMotion ? 0 : siblingIndex * 0.12,
			},
			transitionEnd: { transform: "none" },
		},
		viewport,
	};
}

const elements = {
	div: motion.div,
	header: motion.header,
	nav: motion.nav,
	p: motion.p,
	h2: motion.h2,
	ul: motion.ul,
};

const MotionLink = motion.create(Link);

export function CaseStudyLink({
	href,
	className,
	children,
}: {
	href: Route;
	className?: string;
	children: ReactNode;
}) {
	const reducedMotion = useReducedMotion();
	return (
		<MotionLink {...caseStudyRevealProps(reducedMotion)} href={href} className={className} prefetch>
			{children}
		</MotionLink>
	);
}

export function CaseStudyReveal({
	as = "div",
	siblingIndex = 0,
	className,
	children,
}: {
	as?: keyof typeof elements;
	siblingIndex?: number;
	className?: string;
	children: ReactNode;
}) {
	const reducedMotion = useReducedMotion();
	const Element = elements[as];

	return (
		<Element {...caseStudyRevealProps(reducedMotion, siblingIndex)} className={className}>
			{children}
		</Element>
	);
}
