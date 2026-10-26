"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;

export function PopoverContent({
	side,
	align,
	sideOffset = 8,
	className,
	...props
}: ComponentProps<typeof BasePopover.Popup> &
	Pick<ComponentProps<typeof BasePopover.Positioner>, "side" | "align" | "sideOffset">) {
	return (
		<BasePopover.Portal>
			<BasePopover.Positioner side={side} align={align} sideOffset={sideOffset} className="z-40">
				<BasePopover.Popup
					className={cn(
						"origin-(--transform-origin) rounded-[26px] border border-border bg-background p-3.5 shadow-[0_8px_24px_#0000001a] outline-none transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.19,1,0.22,1)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none dark:shadow-[0_8px_24px_#00000080]",
						className,
					)}
					{...props}
				/>
			</BasePopover.Positioner>
		</BasePopover.Portal>
	);
}
