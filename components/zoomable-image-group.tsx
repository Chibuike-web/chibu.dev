"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { Dialog, type DialogActions, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type GroupImage = { src: StaticImageData; darkSrc?: StaticImageData; alt: string };

type Props = {
	images: GroupImage[];
	width: number;
	height: number;
};

function ThemedImage({
	image,
	width,
	height,
}: {
	image: GroupImage;
	width: number;
	height: number;
}) {
	return (
		<>
			<Image
				src={image.src}
				alt={image.alt}
				width={width}
				height={height}
				loading="lazy"
				placeholder="blur"
				className={cn("h-auto w-full", image.darkSrc && "dark:hidden")}
			/>
			{image.darkSrc && (
				<Image
					src={image.darkSrc}
					alt={image.alt}
					width={width}
					height={height}
					loading="lazy"
					placeholder="blur"
					className="hidden h-auto w-full dark:block"
				/>
			)}
		</>
	);
}

export function ZoomableImageGroup({ images, width, height }: Props) {
	const reducedMotion = useReducedMotion();
	const [previewIndex, setPreviewIndex] = useState<number | null>(null);
	const [direction, setDirection] = useState<number | null>(null);
	const previousButtonRef = useRef<HTMLButtonElement>(null);
	const nextButtonRef = useRef<HTMLButtonElement>(null);
	const openerRef = useRef<HTMLAnchorElement>(null);
	const dialogActionsRef = useRef<DialogActions>(null);

	const isPreviewOpen = previewIndex !== null;

	const previewImage = previewIndex !== null ? images[previewIndex] : null;

	const zoomLayoutId =
		!reducedMotion && previewIndex !== null
			? `zoom-group-${images[previewIndex].src.src}`
			: undefined;

	const openPreview = (index: number, opener: HTMLAnchorElement) => {
		openerRef.current = opener;
		setDirection(null);
		setPreviewIndex(index);
	};

	const closePreview = () => {
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
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{images.map((image, index) => (
					<motion.a
						{...caseStudyRevealProps(reducedMotion, index % 2)}
						key={image.src.src}
						href={image.src.src}
						aria-label={`Open image preview: ${image.alt}, ${index + 1} of ${images.length}`}
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
							openPreview(index, event.currentTarget);
						}}
						className={cn(
							"block w-full cursor-zoom-in overflow-hidden rounded-xl ring ring-surface-hover md:rounded-lg",
							previewIndex === index && "pointer-events-none opacity-0",
						)}
						transition={{ type: "spring", duration: 0.2, bounce: 0 }}
					>
						<ThemedImage image={image} width={1200} height={Math.round((1200 * height) / width)} />
					</motion.a>
				))}
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
							className="pointer-events-none flex w-full flex-col items-center gap-6 max-lg:max-w-[calc((100dvh-9rem)*var(--image-ratio))] lg:max-w-[75vw] 2xl:max-w-[75rem]"
							style={{ "--image-ratio": width / height } as React.CSSProperties}
						>
							<motion.div
								layoutId={zoomLayoutId}
								layoutCrossfade={false}
								className="pointer-events-auto w-full select-none"
							>
								<AnimatePresence mode="popLayout" initial={false} custom={direction} propagate>
									<motion.div
										key={previewIndex}
										custom={direction}
										className="overflow-hidden rounded-xl ring ring-surface-hover"
										variants={{
											enter: (side: number | null) =>
												side === null
													? {}
													: { opacity: 0, transform: `translateX(${side * 120}%)` },
											center: { opacity: 1, transform: "translateX(0px)" },
											exit: (side: number | null) =>
												side === null
													? {}
													: { opacity: 0, transform: `translateX(${side * -120}%)` },
										}}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{ type: "spring", duration: 0.25, bounce: 0 }}
									>
										<ThemedImage image={previewImage} width={width} height={height} />
									</motion.div>
								</AnimatePresence>
							</motion.div>
							<div className="flex gap-4 lg:contents">
								<motion.button
									initial={
										reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(2px)" }
									}
									animate={
										reducedMotion
											? { opacity: previewIndex === 0 ? 0.4 : 1 }
											: { opacity: previewIndex === 0 ? 0.4 : 1, scale: 1, filter: "blur(0px)" }
									}
									exit={
										reducedMotion
											? { opacity: 0, transition: { duration: 0.1 } }
											: {
													opacity: 0,
													scale: 0.9,
													filter: "blur(2px)",
													transition: { duration: 0 },
												}
									}
									transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.35 }}
									ref={previousButtonRef}
									type="button"
									onClick={showPreviousImage}
									disabled={previewIndex === 0}
									aria-label="Previous image"
									className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] disabled:cursor-default disabled:hover:bg-[#464648]/80 lg:absolute lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:left-4"
								>
									<ArrowLeft className="size-5" aria-hidden />
								</motion.button>
								<motion.button
									initial={
										reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(2px)" }
									}
									animate={
										reducedMotion
											? { opacity: previewIndex === images.length - 1 ? 0.4 : 1 }
											: {
													opacity: previewIndex === images.length - 1 ? 0.4 : 1,
													scale: 1,
													filter: "blur(0px)",
												}
									}
									exit={
										reducedMotion
											? { opacity: 0, transition: { duration: 0.1 } }
											: {
													opacity: 0,
													scale: 0.9,
													filter: "blur(2px)",
													transition: { duration: 0 },
												}
									}
									transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.35 }}
									ref={nextButtonRef}
									type="button"
									onClick={showNextImage}
									disabled={previewIndex === images.length - 1}
									aria-label="Next image"
									className="pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-[#464648]/80 text-white transition-[background-color] duration-150 hover:bg-[#464648] disabled:cursor-default disabled:hover:bg-[#464648]/80 lg:absolute lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:right-4"
								>
									<ArrowRight className="size-5" aria-hidden />
								</motion.button>
							</div>

							<DialogClose
								render={
									<motion.button
										initial={
											reducedMotion
												? { opacity: 0 }
												: { opacity: 0, scale: 0.9, filter: "blur(2px)" }
										}
										animate={
											reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: "blur(0px)" }
										}
										exit={
											reducedMotion
												? { opacity: 0, transition: { duration: 0.1 } }
												: {
														opacity: 0,
														scale: 0.9,
														filter: "blur(2px)",
														transition: { duration: 0.1 },
													}
										}
										transition={{ duration: 0.2, delay: reducedMotion ? 0 : 0.1 }}
									/>
								}
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
