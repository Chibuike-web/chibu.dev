"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

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
	const [isPlaying, setIsPlaying] = useState(false);

	const handleVisibilityChange = useEffectEvent((isVisible: boolean) => {
		const video = videoRef.current;
		if (!video) return;
		if (!isVisible) {
			video.pause();
			return;
		}
		if (pausedByViewer.current) return;
		video.play().catch(() => {});
	});

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reducedMotion) pausedByViewer.current = true;

		const observer = new IntersectionObserver(
			([entry]) => handleVisibilityChange(entry.isIntersecting),
			{ threshold: 0.5 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, []);

	const togglePlayback = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			pausedByViewer.current = false;
			video.play().catch(() => {});
		} else {
			pausedByViewer.current = true;
			video.pause();
		}
	};

	return (
		<div className="relative w-full">
			<video
				ref={videoRef}
				muted
				loop
				playsInline
				preload="none"
				width={width}
				height={height}
				poster={poster}
				aria-label={label}
				className="block h-auto w-full"
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			>
				<source src={src} type="video/mp4" />
			</video>
			<button
				type="button"
				onClick={togglePlayback}
				aria-label={isPlaying ? "Pause video" : "Play video"}
				className="absolute right-3 bottom-3 flex size-9 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648]"
			>
				{isPlaying ? (
					<Pause className="size-4" fill="currentColor" aria-hidden />
				) : (
					<Play className="size-4" fill="currentColor" aria-hidden />
				)}
			</button>
		</div>
	);
}
