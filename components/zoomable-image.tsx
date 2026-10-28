"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { caseStudyRevealProps } from "@/components/case-study-reveal";
import { Dialog, type DialogActions, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useRef, useState } from "react";
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
	const thumbnailRef = useRef<HTMLAnchorElement>(null);
	const dialogActionsRef = useRef<DialogActions>(null);
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
					"block w-full cursor-zoom-in overflow-hidden rounded-xl border border-transparent bg-surface-muted ring ring-surface-hover",
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

			<Dialog
				open={isZoomed}
				onOpenChange={(open, eventDetails) => {
					if (!open) eventDetails.preventUnmountOnClose();
					setIsZoomed(open);
				}}
				actionsRef={dialogActionsRef}
			>
				<AnimatePresence onExitComplete={() => dialogActionsRef.current?.unmount()}>
					{isZoomed && (
						<DialogContent
							aria-label="Image preview"
							finalFocus={thumbnailRef}
							viewportClassName="cursor-zoom-out"
							className="w-full lg:max-w-[75vw] 2xl:max-w-[75rem]"
						>
							<motion.div
								layoutId={reducedMotion ? undefined : layoutId}
								layoutCrossfade={false}
								initial={reducedMotion ? { opacity: 0 } : false}
								animate={{ opacity: 1 }}
								exit={reducedMotion ? { opacity: 0 } : undefined}
								className="w-full select-none overflow-hidden rounded-xl ring ring-surface-hover [background:linear-gradient(var(--surface-muted),var(--surface-muted)),var(--background)]"
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
									className="h-auto w-full"
								/>
							</motion.div>

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
								className="absolute right-4 top-4 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full border border-transparent text-foreground"
								aria-label="Close image preview"
							>
								<X aria-hidden="true" className="size-5" />
							</DialogClose>
						</DialogContent>
					)}
				</AnimatePresence>
			</Dialog>
		</>
	);
}
