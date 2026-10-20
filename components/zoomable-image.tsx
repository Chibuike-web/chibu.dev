"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { ImagePreviewDialog } from "@/components/image-preview-dialog";
import { useState } from "react";
import { X } from "lucide-react";
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
	const layoutId = `zoom-image-${src.src}`;

	const handleOpen = () => {
		setIsZoomed(true);
	};

	const handleClose = () => {
		setIsZoomed(false);
	};

	return (
		<>
			{/* Thumbnail state */}
			<motion.a
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
					handleOpen();
				}}
				className={cn(
					"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted ring ring-surface-hover focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring",
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

			<AnimatePresence>
				{isZoomed && (
					<ImagePreviewDialog onClose={handleClose}>
						{/* Backdrop */}
						<motion.div
							className="fixed inset-0 z-[999] bg-background/90 backdrop-blur-md"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							aria-hidden="true"
						/>

						{/* Expanded state */}
						<motion.div
							className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center px-4 lg:px-0"
							onMouseDown={(event) => {
								if (event.target === event.currentTarget) {
									handleClose();
								}
							}}
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 1 }}
						>
							<motion.div
								layoutId={reducedMotion ? undefined : layoutId}
								initial={reducedMotion ? { opacity: 0 } : false}
								animate={{ opacity: 1 }}
								exit={reducedMotion ? { opacity: 0 } : undefined}
								className="w-full select-none overflow-hidden rounded-xl bg-surface-muted ring ring-surface-hover lg:max-w-[75vw] 2xl:max-w-[75rem]"
								transition={
									reducedMotion ? { duration: 0.12 } : { type: "spring", duration: 0.2, bounce: 0 }
								}
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
							</motion.div>

							<button
								type="button"
								className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-foreground focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
								onClick={handleClose}
								aria-label="Close image preview"
								data-preview-close
							>
								<X aria-hidden="true" className="size-5" />
								<span className="sr-only">Close preview</span>
							</button>
						</motion.div>
					</ImagePreviewDialog>
				)}
			</AnimatePresence>
		</>
	);
}
