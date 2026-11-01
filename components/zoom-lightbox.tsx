"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type ReactNode, type RefObject, useRef } from "react";
import { X } from "lucide-react";
import { Dialog, type DialogActions, DialogClose, DialogContent } from "@/components/ui/dialog";

type ZoomLightboxProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	layoutId: string;
	finalFocus: RefObject<HTMLElement | null>;
	label: string;
	closeLabel: string;
	children: ReactNode;
};

export function ZoomLightbox({
	open,
	onOpenChange,
	layoutId,
	finalFocus,
	label,
	closeLabel,
	children,
}: ZoomLightboxProps) {
	const reducedMotion = useReducedMotion();
	const dialogActionsRef = useRef<DialogActions>(null);

	return (
		<Dialog
			open={open}
			onOpenChange={(nextOpen, eventDetails) => {
				if (!nextOpen) eventDetails.preventUnmountOnClose();
				onOpenChange(nextOpen);
			}}
			actionsRef={dialogActionsRef}
		>
			<AnimatePresence onExitComplete={() => dialogActionsRef.current?.unmount()}>
				{open && (
					<DialogContent
						aria-label={label}
						finalFocus={finalFocus}
						viewportClassName="cursor-zoom-out"
						className="w-[min(100%,(100dvh-2rem)*16/9)] lg:w-[min(75vw,75rem,(100dvh-2rem)*16/9)]"
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
							{children}
						</motion.div>

						<DialogClose
							render={
								<motion.button
									initial={
										reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: "blur(2px)" }
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
							aria-label={closeLabel}
						>
							<X aria-hidden="true" className="size-5" />
						</DialogClose>
					</DialogContent>
				)}
			</AnimatePresence>
		</Dialog>
	);
}
