"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { ImagePreviewDialog } from "@/components/image-preview-dialog";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	images: { src: StaticImageData; alt: string }[];
	width: number;
	height: number;
};

const SLIDE_DISTANCE = 1000;

// Controls fade with the backdrop so they don't linger while the image
// springs back to its thumbnail (the dialog unmounts only after that finishes).
const controlFade = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.2 },
};

export function ZoomableImageGroup({ images, width, height }: Props) {
	const reducedMotion = useReducedMotion();
	const [openedFromIndex, setOpenedFromIndex] = useState<number | null>(null);
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState<number | null>(null);
	const previousButtonRef = useRef<HTMLButtonElement>(null);
	const nextButtonRef = useRef<HTMLButtonElement>(null);

	const isPreviewOpen = openedFromIndex !== null;

	const previewImage = previewIndex !== null ? images[previewIndex] : null;

	const zoomLayoutId =
		!reducedMotion && direction === null && openedFromIndex !== null
			? `zoom-group-${images[openedFromIndex].src.src}`
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
			// Keep focus inside the dialog when this button becomes disabled.
			if (previewIndex - 1 === 0) nextButtonRef.current?.focus();
		}
	};

	const showNextImage = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (previewIndex !== null && previewIndex < images.length - 1) {
			setDirection(1);
			setPreviewIndex(previewIndex + 1);
			// Keep focus inside the dialog when this button becomes disabled.
			if (previewIndex + 1 === images.length - 1) previousButtonRef.current?.focus();
		}
	};

	return (
		<>
			<motion.a
				{...caseStudyRevealProps(reducedMotion)}
				href={images[0].src.src}
				aria-label={`Open image preview: ${images[0].alt}, 1 of ${images.length}`}
				layoutId={reducedMotion ? undefined : `zoom-group-${images[0].src.src}`}
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
					openPreview(0);
				}}
				className={cn(
					"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring",
					isPreviewOpen && openedFromIndex === 0 && "pointer-events-none opacity-0",
				)}
				transition={{ type: "spring", duration: 0.2, bounce: 0 }}
			>
				<Image
					src={images[0].src}
					alt={images[0].alt}
					width={width}
					height={height}
					loading="lazy"
					placeholder="blur"
					className="h-auto w-full"
				/>
			</motion.a>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				{images.slice(1).map((image, index) => {
					const imageIndex = index + 1;

					return (
						<motion.a
							{...caseStudyRevealProps(reducedMotion, index % 2)}
							key={image.src.src}
							href={image.src.src}
							aria-label={`Open image preview: ${image.alt}, ${imageIndex + 1} of ${images.length}`}
							layoutId={reducedMotion ? undefined : `zoom-group-${image.src.src}`}
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
								openPreview(imageIndex);
							}}
							className={cn(
								"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring md:rounded-lg",
								isPreviewOpen && openedFromIndex === imageIndex && "pointer-events-none opacity-0",
							)}
							transition={{ type: "spring", duration: 0.2, bounce: 0 }}
						>
							<Image
								src={image.src}
								alt={image.alt}
								width={width}
								height={height}
								loading="lazy"
								placeholder="blur"
								className="h-auto w-full"
							/>
						</motion.a>
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
							<div
								className="pointer-events-none flex w-full flex-col items-center gap-6 max-md:max-w-[calc((100dvh-9rem)*var(--image-ratio))] lg:max-w-[75vw] 2xl:max-w-[75rem]"
								style={{ "--image-ratio": width / height } as React.CSSProperties}
							>
								<motion.div
									layoutId={zoomLayoutId}
									className="pointer-events-auto w-full select-none overflow-hidden rounded-xl bg-surface-muted"
									key={previewIndex}
									initial={
										reducedMotion
											? { opacity: 0 }
											: {
													transform: `translateX(${direction === null ? 0 : direction === 1 ? SLIDE_DISTANCE : -SLIDE_DISTANCE}px)`,
												}
									}
									animate={reducedMotion ? { opacity: 1 } : { transform: "translateX(0px)" }}
									exit={zoomLayoutId ? undefined : { opacity: 0 }}
									transition={
										reducedMotion
											? { duration: 0.12 }
											: { type: "spring", duration: 0.2, bounce: 0 }
									}
								>
									<Image
										src={previewImage.src}
										alt={previewImage.alt}
										width={width}
										height={height}
										loading="lazy"
										placeholder="blur"
										className="h-auto w-full"
									/>
								</motion.div>

								{images.length > 1 && (
									<div className="flex gap-4 md:contents">
										<motion.button
											{...controlFade}
											animate={{ opacity: previewIndex === 0 ? 0.4 : 1 }}
											ref={previousButtonRef}
											type="button"
											onClick={showPreviousImage}
											disabled={previewIndex === 0}
											aria-label="Previous image"
											className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-default disabled:hover:bg-[#464648]/80 md:absolute md:top-1/2 md:z-10 md:-translate-y-1/2 md:left-4"
										>
											<ArrowLeft className="size-5" aria-hidden />
										</motion.button>
										<motion.button
											{...controlFade}
											animate={{ opacity: previewIndex === images.length - 1 ? 0.4 : 1 }}
											ref={nextButtonRef}
											type="button"
											onClick={showNextImage}
											disabled={previewIndex === images.length - 1}
											aria-label="Next image"
											className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-default disabled:hover:bg-[#464648]/80 md:absolute md:top-1/2 md:z-10 md:-translate-y-1/2 md:right-4"
										>
											<ArrowRight className="size-5" aria-hidden />
										</motion.button>
									</div>
								)}
							</div>

							<motion.button
								{...controlFade}
								type="button"
								className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-foreground focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
								onClick={closePreview}
								aria-label="Close image preview"
								data-preview-close
							>
								<X className="size-5" aria-hidden />
							</motion.button>
						</motion.div>
					</ImagePreviewDialog>
				)}
			</AnimatePresence>
		</>
	);
}
