"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export default function ProgressRing({
	size = 16,
	strokeWidth = 2,
	className,
}: {
	size?: number;
	strokeWidth?: number;
	className?: string;
}) {
	const reducedMotion = useReducedMotion();
	const { scrollYProgress } = useScroll();
	const smoothed = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
	const progress = reducedMotion ? scrollYProgress : smoothed;

	const center = size / 2;
	const radius = (size - strokeWidth) / 2;

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			className={cn("shrink-0 -rotate-90", className)}
			aria-hidden="true"
		>
			<circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				className="opacity-20"
			/>
			<motion.circle
				cx={center}
				cy={center}
				r={radius}
				fill="none"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				style={{ pathLength: progress }}
			/>
		</svg>
	);
}
