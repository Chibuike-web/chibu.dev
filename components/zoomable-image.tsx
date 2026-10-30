"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { ZoomLightbox } from "@/components/zoom-lightbox";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ZoomableImageProps = {
	src: StaticImageData;
	alt: string;
	width: number;
	height: number;
	className?: string;
};

export function ZoomableImage({ src, alt, width, height, className }: ZoomableImageProps) {
	const reducedMotion = useReducedMotion();
	const [isZoomed, setIsZoomed] = useState(false);
	const thumbnailRef = useRef<HTMLAnchorElement>(null);
	const layoutId = `zoom-image-${src.src}`;

	return (
		<>
			<motion.a
				ref={thumbnailRef}
				{...caseStudyRevealProps(reducedMotion)}
				href={src.src}
				aria-label={`Open image preview: ${alt}`}
				layoutId={reducedMotion ? undefined : layoutId}
				onClick={(event) => {
					if (
						event.button !== 0 ||
						event.metaKey ||
						event.ctrlKey ||
						event.shiftKey ||
						event.altKey
					) {
						return;
					}
					event.preventDefault();
					setIsZoomed(true);
				}}
				className={cn(
					"block w-full cursor-zoom-in overflow-hidden rounded-xl ring ring-surface-hover",
					isZoomed && "pointer-events-none opacity-0",
					className,
				)}
				transition={{ type: "spring", duration: 0.2, bounce: 0 }}
			>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading="lazy"
					placeholder="blur"
					className="h-auto w-full"
				/>
			</motion.a>

			<ZoomLightbox
				open={isZoomed}
				onOpenChange={setIsZoomed}
				layoutId={layoutId}
				finalFocus={thumbnailRef}
				label="Image preview"
				closeLabel="Close image preview"
			>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					loading="lazy"
					className="h-auto w-full"
				/>
			</ZoomLightbox>
		</>
	);
}
