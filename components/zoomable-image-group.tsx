"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { ImagePreviewDialog } from "@/components/image-preview-dialog";
import { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	images: StaticImageData[];
	width: number;
	height: number;
	alt?: string;
};

const SLIDE_DISTANCE = 1000;

export function ZoomableImageGroup({ images, width, height, alt }: Props) {
	const reducedMotion = useReducedMotion();
	const [openedFromIndex, setOpenedFromIndex] = useState<number | null>(null);
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState<number | null>(null);

	const isPreviewOpen = openedFromIndex !== null;

	const previewImage = previewIndex !== null ? images[previewIndex] : null;

	const zoomLayoutId =
		!reducedMotion && isPreviewOpen && openedFromIndex !== null
			? `zoom-group-${images[openedFromIndex].src}`
			: undefined;

	const openPreview = (index: number) => {
		setDirection(null);
		setOpenedFromIndex(index);
		setPreviewIndex(index);
	};

	const closePreview = () => {
		setOpenedFromIndex(null);
		setPreviewIndex(null);
		setDirection(null);
	};

	const showPreviousImage = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (previewIndex !== null && previewIndex > 0) {
			setDirection(-1);
			setPreviewIndex(previewIndex - 1);
		}
	};

	const showNextImage = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (previewIndex !== null && previewIndex < images.length - 1) {
			setDirection(1);
			setPreviewIndex(previewIndex + 1);
		}
	};

	return (
		<>
			<motion.button
				{...caseStudyRevealProps(reducedMotion)}
				type="button"
				aria-label={`Open image preview: ${alt || "Case study image"}, 1 of ${images.length}`}
				layoutId={reducedMotion ? undefined : `zoom-group-${images[0].src}`}
				onClick={() => openPreview(0)}
				className={cn(
					"w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted ring ring-surface-hover focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring",
					isPreviewOpen && openedFromIndex === 0 && "pointer-events-none opacity-0",
				)}
				transition={{ type: "spring", duration: 0.2, bounce: 0 }}
			>
				<Image
					src={images[0]}
					alt={alt ?? ""}
					width={width}
					height={height}
					loading="lazy"
					placeholder="blur"
					className="h-auto w-full"
				/>
			</motion.button>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				{images.slice(1).map((image, index) => {
					const imageIndex = index + 1;

					return (
						<motion.button
							{...caseStudyRevealProps(reducedMotion, index % 2)}
							key={image.src}
							type="button"
							aria-label={`Open image preview: ${alt || "Case study image"}, ${imageIndex + 1} of ${images.length}`}
							layoutId={reducedMotion ? undefined : `zoom-group-${image.src}`}
							onClick={() => openPreview(imageIndex)}
							className={cn(
								"w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted ring ring-surface-hover focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring md:rounded-lg",
								isPreviewOpen && openedFromIndex === imageIndex && "pointer-events-none opacity-0",
							)}
							transition={{ type: "spring", duration: 0.2, bounce: 0 }}
						>
							<Image
								src={image}
								alt={alt ?? ""}
								width={width}
								height={height}
								loading="lazy"
								placeholder="blur"
								className="h-auto w-full"
							/>
						</motion.button>
					);
				})}
			</div>

			<AnimatePresence>
				{isPreviewOpen && previewImage && (
					<ImagePreviewDialog
						onClose={closePreview}
						onKeyDown={(event) => {
							if (event.key === "ArrowLeft" && previewIndex !== null && previewIndex > 0) {
								event.preventDefault();
								setDirection(-1);
								setPreviewIndex(previewIndex - 1);
							}
							if (
								event.key === "ArrowRight" &&
								previewIndex !== null &&
								previewIndex < images.length - 1
							) {
								event.preventDefault();
								setDirection(1);
								setPreviewIndex(previewIndex + 1);
							}
						}}
					>
						<motion.div
							className="fixed inset-0 z-[999] bg-background/90 backdrop-blur-md"
							aria-hidden="true"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={closePreview}
						/>

						<motion.div
							className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center px-4 lg:px-0"
							onMouseDown={(event) => {
								if (event.target === event.currentTarget) {
									closePreview();
								}
							}}
							initial={{ opacity: 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 1 }}
						>
							<motion.div
								layoutId={zoomLayoutId}
								className="w-full select-none overflow-hidden rounded-xl bg-surface-muted ring ring-surface-hover lg:max-w-[75vw] 2xl:max-w-[75rem]"
								key={previewIndex}
								initial={
									reducedMotion
										? { opacity: 0 }
										: {
												transform: `translateX(${direction === null ? 0 : direction === 1 ? SLIDE_DISTANCE : -SLIDE_DISTANCE}px)`,
											}
								}
								animate={reducedMotion ? { opacity: 1 } : { transform: "translateX(0px)" }}
								exit={
									reducedMotion
										? { opacity: 0 }
										: {
												transform: `translateX(${direction === 1 ? -SLIDE_DISTANCE : SLIDE_DISTANCE}px)`,
											}
								}
								transition={
									reducedMotion ? { duration: 0.12 } : { type: "spring", duration: 0.2, bounce: 0 }
								}
							>
								<Image
									src={previewImage}
									alt={alt ?? ""}
									width={width}
									height={height}
									loading="lazy"
									placeholder="blur"
									className="h-auto w-full"
								/>
							</motion.div>

							{previewIndex !== null && previewIndex > 0 && (
								<button
									type="button"
									onClick={showPreviousImage}
									aria-label="Previous image"
									className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-colors duration-150 hover:bg-[#464648] focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
								>
									<ArrowLeft className="size-5" aria-hidden />
								</button>
							)}

							{previewIndex !== null && previewIndex < images.length - 1 && (
								<button
									type="button"
									onClick={showNextImage}
									aria-label="Next image"
									className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-colors duration-150 hover:bg-[#464648] focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
								>
									<ArrowRight className="size-5" aria-hidden />
								</button>
							)}

							<button
								type="button"
								className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-transparent text-foreground focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
								onClick={closePreview}
								aria-label="Close image preview"
								data-preview-close
							>
								<X className="size-5" aria-hidden />
							</button>
						</motion.div>
					</ImagePreviewDialog>
				)}
			</AnimatePresence>
		</>
	);
}
