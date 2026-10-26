"use client";

import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Drawer = BaseDrawer.Root;
export const DrawerTrigger = BaseDrawer.Trigger;
export const DrawerClose = BaseDrawer.Close;

export function DrawerContent({
	className,
	children,
	...props
}: ComponentProps<typeof BaseDrawer.Popup>) {
	return (
		<BaseDrawer.Portal>
			<BaseDrawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.35*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-swiping:duration-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none supports-[-webkit-touch-callout:none]:absolute" />
			<BaseDrawer.Viewport className="fixed inset-0 z-50 flex items-end">
				<BaseDrawer.Popup
					className={cn(
						"-mb-12 flex w-full flex-col gap-4.5 rounded-t-3xl bg-background px-5 pt-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px)+3rem)] shadow-[0_-4px_24px_#0000001a] outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-starting-style:[transform:translateY(calc(100%-3rem+2px))] data-ending-style:[transform:translateY(calc(100%-3rem+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none dark:shadow-[0_-4px_24px_#00000080]",
						className,
					)}
					{...props}
				>
					<div className="mx-auto -mb-2 h-1 w-9 rounded-full bg-surface-hover" />
					{children}
				</BaseDrawer.Popup>
			</BaseDrawer.Viewport>
		</BaseDrawer.Portal>
	);
}

export function DrawerTitle({ className, ...props }: ComponentProps<typeof BaseDrawer.Title>) {
	return (
		<BaseDrawer.Title
			className={cn("text-[17px] font-semibold tracking-[-0.3px]", className)}
			{...props}
		/>
	);
}

export function DrawerDescription({
	className,
	...props
}: ComponentProps<typeof BaseDrawer.Description>) {
	return (
		<BaseDrawer.Description
			className={cn("text-[13px] text-muted-foreground", className)}
			{...props}
		/>
	);
}
