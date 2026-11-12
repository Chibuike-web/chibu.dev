"use client";

import { useEffect, useRef } from "react";

type LoopVideoProps = {
	src: string;
	poster: string;
	label: string;
	width: number;
	height: number;
};

export function LoopVideo({ src, poster, label, width, height }: LoopVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const isOnScreen = useRef(false);
	const shouldPlay = useRef(true);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			shouldPlay.current = false;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					isOnScreen.current = entry.isIntersecting;
					if (!entry.isIntersecting) {
						video.pause();
					} else if (shouldPlay.current) {
						video.play().catch(() => {});
					}
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="relative w-full">
			<video
				ref={videoRef}
				controls
				muted
				loop
				playsInline
				preload="none"
				width={width}
				height={height}
				poster={poster}
				aria-label={label}
				className="block h-auto w-full object-cover"
				onPlay={() => {
					shouldPlay.current = true;
				}}
				onPause={() => {
					if (isOnScreen.current) {
						shouldPlay.current = false;
					}
				}}
			>
				<source src={src} type="video/mp4" />
			</video>
		</div>
	);
}
