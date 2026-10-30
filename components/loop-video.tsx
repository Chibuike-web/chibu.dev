"use client";

import { motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { type RefObject, useEffect, useEffectEvent, useRef, useState } from "react";
import { ZoomLightbox } from "@/components/zoom-lightbox";
import { cn } from "@/lib/utils";

type LoopVideoProps = {
	src: string;
	poster: string;
	label: string;
	width: number;
	height: number;
};

type VideoPlayerProps = LoopVideoProps & {
	videoRef: RefObject<HTMLVideoElement | null>;
	pausedByViewer: RefObject<boolean>;
	onViewerToggle: (paused: boolean) => void;
	preload: "none" | "auto";
	suspended?: boolean;
	startTime?: number;
};

function VideoPlayer({
	src,
	poster,
	label,
	width,
	height,
	videoRef,
	pausedByViewer,
	onViewerToggle,
	preload,
	suspended = false,
	startTime = 0,
}: VideoPlayerProps) {
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
		if (suspended) {
			video.pause();
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => handleVisibilityChange(entry.isIntersecting),
			{ threshold: 0.5 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, [suspended, videoRef]);

	const togglePlayback = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			onViewerToggle(false);
			video.play().catch(() => {});
		} else {
			onViewerToggle(true);
			video.pause();
		}
	};

	return (
		<div className="relative w-full cursor-default">
			<video
				ref={videoRef}
				muted
				loop
				playsInline
				preload={preload}
				width={width}
				height={height}
				poster={poster}
				aria-label={label}
				className="block h-auto w-full object-cover"
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onLoadedMetadata={(event) => {
					event.currentTarget.currentTime = startTime;
				}}
			>
				<source src={src} type="video/mp4" />
			</video>
			<button
				type="button"
				onClick={togglePlayback}
				aria-label={isPlaying ? "Pause video" : "Play video"}
				className="absolute right-3 bottom-3 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648]"
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

export function LoopVideo(props: LoopVideoProps) {
	const reducedMotion = useReducedMotion();
	const [isZoomed, setIsZoomed] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const thumbnailVideoRef = useRef<HTMLVideoElement>(null);
	const zoomedVideoRef = useRef<HTMLVideoElement>(null);
	const zoomButtonRef = useRef<HTMLButtonElement>(null);
	const pausedByViewer = useRef(false);
	const layoutId = `zoom-video-${props.src}`;
	const handleViewerToggle = (paused: boolean) => {
		pausedByViewer.current = paused;
	};

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			pausedByViewer.current = true;
		}
	}, []);

	return (
		<>
			<motion.div
				layoutId={reducedMotion ? undefined : layoutId}
				className={cn(
					"relative w-full overflow-hidden rounded-xl",
					isZoomed && "pointer-events-none opacity-0",
				)}
				transition={{ type: "spring", duration: 0.2, bounce: 0 }}
			>
				<VideoPlayer
					{...props}
					videoRef={thumbnailVideoRef}
					pausedByViewer={pausedByViewer}
					onViewerToggle={handleViewerToggle}
					preload="none"
					suspended={isZoomed}
				/>
				<button
					ref={zoomButtonRef}
					type="button"
					data-js-only
					aria-label={`Open video preview: ${props.label}`}
					onClick={() => {
						setStartTime(thumbnailVideoRef.current?.currentTime ?? 0);
						setIsZoomed(true);
					}}
					className="absolute inset-0 cursor-zoom-in rounded-xl focus-visible:inset-ring-3! focus-visible:inset-ring-(--focus-ring)"
				/>
			</motion.div>

			<ZoomLightbox
				open={isZoomed}
				onOpenChange={(open) => {
					const thumbnailVideo = thumbnailVideoRef.current;
					const zoomedVideo = zoomedVideoRef.current;
					if (!open && thumbnailVideo && zoomedVideo?.readyState) {
						thumbnailVideo.currentTime = zoomedVideo.currentTime;
					}
					setIsZoomed(open);
				}}
				layoutId={layoutId}
				finalFocus={zoomButtonRef}
				label="Video preview"
				closeLabel="Close video preview"
			>
				<VideoPlayer
					{...props}
					videoRef={zoomedVideoRef}
					pausedByViewer={pausedByViewer}
					onViewerToggle={handleViewerToggle}
					preload="auto"
					startTime={startTime}
				/>
			</ZoomLightbox>
		</>
	);
}
