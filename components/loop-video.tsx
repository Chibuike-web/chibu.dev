"use client";

import { motion, useReducedMotion } from "motion/react";
import { Maximize2 } from "lucide-react";
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
	const pausedBySystem = useRef(false);

	const pauseForSystem = () => {
		const video = videoRef.current;
		if (!video || video.paused) return;
		pausedBySystem.current = true;
		video.pause();
	};

	const handleVisibilityChange = useEffectEvent((isVisible: boolean) => {
		const video = videoRef.current;
		if (!video) return;
		if (!isVisible) {
			pauseForSystem();
			return;
		}
		if (pausedByViewer.current) return;
		video.play().catch(() => {});
	});

	const suspend = useEffectEvent(pauseForSystem);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (suspended) {
			suspend();
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => handleVisibilityChange(entry.isIntersecting),
			{ threshold: 0.5 },
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, [suspended, videoRef]);

	return (
		<div className="relative w-full cursor-default">
			<video
				ref={videoRef}
				controls
				muted
				loop
				playsInline
				preload={preload}
				width={width}
				height={height}
				poster={poster}
				aria-label={label}
				className="block h-auto w-full object-cover"
				onPlay={() => onViewerToggle(false)}
				onPause={(event) => {
					if (!event.currentTarget.isConnected) return;
					if (pausedBySystem.current) {
						pausedBySystem.current = false;
						return;
					}
					onViewerToggle(true);
				}}
				onLoadedMetadata={(event) => {
					event.currentTarget.currentTime = startTime;
				}}
			>
				<source src={src} type="video/mp4" />
			</video>
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
					className="absolute right-3 top-3 z-10 flex size-9 cursor-zoom-in items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] focus-visible:inset-ring-3! focus-visible:inset-ring-(--focus-ring)"
				>
					<Maximize2 className="size-4" aria-hidden />
				</button>
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
