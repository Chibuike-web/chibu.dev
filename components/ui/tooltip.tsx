"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

export function TooltipContent({
	side,
	sideOffset = 9,
	className,
	children,
	...props
}: ComponentProps<typeof BaseTooltip.Popup> &
	Pick<ComponentProps<typeof BaseTooltip.Positioner>, "side" | "sideOffset">) {
	return (
		<BaseTooltip.Portal>
			<BaseTooltip.Positioner side={side} sideOffset={sideOffset} className="z-40">
				<BaseTooltip.Popup
					className={cn(
						"origin-(--transform-origin) rounded-full bg-foreground px-2.5 py-1.5 text-xs leading-[1.25] font-medium whitespace-nowrap text-background transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.19,1,0.22,1)] data-ending-style:scale-96 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-96 data-starting-style:opacity-0 motion-reduce:transition-none",
						className,
					)}
					{...props}
				>
					{children}
					<BaseTooltip.Arrow className="top-full flex">
						<svg width="10" height="5" viewBox="0 0 10 5" className="fill-foreground">
							<path d="M0 0H10L6.2 4.2Q5 5.4 3.8 4.2Z" />
						</svg>
					</BaseTooltip.Arrow>
				</BaseTooltip.Popup>
			</BaseTooltip.Positioner>
		</BaseTooltip.Portal>
	);
}
