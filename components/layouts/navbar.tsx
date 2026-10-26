"use client";

import { useRealTime } from "@/hooks/use-real-time";
import { LogoIcon } from "@/icons/logo-icon";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export function Navbar() {
	const time = useRealTime();

	return (
		<div data-enter="0" className="mount-1 flex items-center justify-between">
			<div className="flex items-center gap-2.5">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-muted">
					<LogoIcon />
				</div>
				<div className="flex flex-col gap-2.5 font-medium">
					<h1 className="no-line-height tight text-foreground">Chibuike Maduabuchi</h1>
					<p className="no-line-height tight text-muted-foreground">Design Engineer</p>
				</div>
			</div>
			<div
				data-js-only
				className={cn(
					"flex min-h-9 items-center gap-1.5 rounded-full bg-surface-muted py-1.5 pr-4 pl-3 font-semibold tabular-nums",
					!time && "invisible",
				)}
			>
				<Clock className="size-4" aria-hidden />
				{time || "00:00AM"}
			</div>
		</div>
	);
}
