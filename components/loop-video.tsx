"use client";

import { useEffect, useEffectEvent, useRef } from "react";

type LoopVideoProps = {
	src: string;
	poster: string;
	label: string;
	width: number;
	height: number;
};

export function LoopVideo({ src, poster, label, width, height }: LoopVideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const pausedByViewer = useRef(false);
	const pausedBySystem = useRef(false);

	const handleVisibilityChange = useEffectEvent((isVisible: boolean) => {
		const video = videoRef.current;
		if (!video) return;
		if (!isVisible) {
			if (video.paused) return;
			pausedBySystem.current = true;
			video.pause();
			return;
		}
		if (pausedByViewer.current) return;
		video.play().catch(() => {});
	});

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			pausedByViewer.current = true;
		}
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const observer = new IntersectionObserver(
			([entry]) => handleVisibilityChange(entry.isIntersecting),
			{ threshold: 0.5 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="relative w-full overflow-hidden rounded-xl">
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
					pausedByViewer.current = false;
				}}
				onPause={() => {
					if (pausedBySystem.current) {
						pausedBySystem.current = false;
						return;
					}
					pausedByViewer.current = true;
				}}
			>
				<source src={src} type="video/mp4" />
			</video>
		</div>
	);
}
