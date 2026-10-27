"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { motion } from "motion/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Dialog = BaseDialog.Root;
export const DialogClose = BaseDialog.Close;
export type DialogActions = BaseDialog.Root.Actions;

export function DialogContent({
	className,
	viewportClassName,
	...props
}: ComponentProps<typeof BaseDialog.Popup> & { viewportClassName?: string }) {
	return (
		<BaseDialog.Portal keepMounted>
			<BaseDialog.Backdrop
				render={
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					/>
				}
				className="fixed inset-0 z-[999] bg-background/90 backdrop-blur-md"
			/>
			<BaseDialog.Viewport
				className={cn(
					"fixed inset-0 z-[9999] flex items-center justify-center px-4 lg:px-0",
					viewportClassName,
				)}
			>
				<BaseDialog.Popup className={cn("outline-none", className)} {...props} />
			</BaseDialog.Viewport>
		</BaseDialog.Portal>
	);
}
