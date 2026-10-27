"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { Dialog, type DialogActions, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	images: { src: StaticImageData; alt: string }[];
	width: number;
	height: number;
};

const SLIDE_DISTANCE = 1000;

function controlMotion(reducedMotion: boolean | null, opacity = 1) {
	const hidden = reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(2px)" };

	return {
		initial: hidden,
		animate: reducedMotion ? { opacity } : { opacity, scale: 1, filter: "blur(0px)" },
		exit: { ...hidden, transition: { duration: 0.1 } },
		transition: { duration: 0.2, delay: reducedMotion ? 0 : 0.1 },
	};
}

export function ZoomableImageGroup({ images, width, height }: Props) {
	const reducedMotion = useReducedMotion();
	const [openedFromIndex, setOpenedFromIndex] = useState<number | null>(null);
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState<number | null>(null);
	const previousButtonRef = useRef<HTMLButtonElement>(null);
	const nextButtonRef = useRef<HTMLButtonElement>(null);
	const openerRef = useRef<HTMLAnchorElement>(null);
	const dialogActionsRef = useRef<DialogActions>(null);

	const isPreviewOpen = openedFromIndex !== null;

	const previewImage = previewIndex !== null ? images[previewIndex] : null;

	const zoomLayoutId =
		!reducedMotion && direction === null && openedFromIndex !== null
			? `zoom-group-${images[openedFromIndex].src.src}`
			: undefined;

	const openPreview = (index: number, opener: HTMLAnchorElement) => {
		openerRef.current = opener;
		setDirection(null);
		setOpenedFromIndex(index);
		setPreviewIndex(index);
	};

	const closePreview = () => {
		setOpenedFromIndex(null);
		setPreviewIndex(null);
		setDirection(null);
	};

	const showPreviousImage = () => {
		if (previewIndex !== null && previewIndex > 0) {
			setDirection(-1);
			setPreviewIndex(previewIndex - 1);
			if (previewIndex - 1 === 0) nextButtonRef.current?.focus();
		}
	};

	const showNextImage = () => {
		if (previewIndex !== null && previewIndex < images.length - 1) {
			setDirection(1);
			setPreviewIndex(previewIndex + 1);
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
					openPreview(0, event.currentTarget);
				}}
				className={cn(
					"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted",
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
								openPreview(imageIndex, event.currentTarget);
							}}
							className={cn(
								"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted md:rounded-lg",
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

			<Dialog
				open={isPreviewOpen}
				onOpenChange={(open, eventDetails) => {
					if (open) return;
					eventDetails.preventUnmountOnClose();
					closePreview();
				}}
				actionsRef={dialogActionsRef}
			>
				<AnimatePresence onExitComplete={() => dialogActionsRef.current?.unmount()}>
					{isPreviewOpen && previewImage && (
						<DialogContent
							aria-label="Image preview"
							finalFocus={openerRef}
							onKeyDown={(event) => {
								if (event.key === "ArrowLeft") showPreviousImage();
								if (event.key === "ArrowRight") showNextImage();
							}}
							viewportClassName="cursor-zoom-out"
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
									reducedMotion ? { duration: 0.12 } : { type: "spring", duration: 0.2, bounce: 0 }
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
										{...controlMotion(reducedMotion, previewIndex === 0 ? 0.4 : 1)}
										ref={previousButtonRef}
										type="button"
										onClick={showPreviousImage}
										disabled={previewIndex === 0}
										aria-label="Previous image"
										className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] disabled:cursor-default disabled:hover:bg-[#464648]/80 md:absolute md:top-1/2 md:z-10 md:-translate-y-1/2 md:left-4"
									>
										<ArrowLeft className="size-5" aria-hidden />
									</motion.button>
									<motion.button
										{...controlMotion(reducedMotion, previewIndex === images.length - 1 ? 0.4 : 1)}
										ref={nextButtonRef}
										type="button"
										onClick={showNextImage}
										disabled={previewIndex === images.length - 1}
										aria-label="Next image"
										className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] disabled:cursor-default disabled:hover:bg-[#464648]/80 md:absolute md:top-1/2 md:z-10 md:-translate-y-1/2 md:right-4"
									>
										<ArrowRight className="size-5" aria-hidden />
									</motion.button>
								</div>
							)}

							<DialogClose
								render={<motion.button {...controlMotion(reducedMotion)} />}
								className="pointer-events-auto absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-foreground"
								aria-label="Close image preview"
							>
								<X className="size-5" aria-hidden />
							</DialogClose>
						</DialogContent>
					)}
				</AnimatePresence>
			</Dialog>
		</>
	);
}
