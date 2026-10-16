"use client";

import { useCopyEmail } from "@/hooks/use-copy-email";
import { useRealTime } from "@/hooks/use-real-time";
import { cn } from "@/lib/utils";
import { Check, CopyIcon } from "lucide-react";

export function Footer() {
	const { copyEmail, copied } = useCopyEmail();
	const time = useRealTime();
	const iconClass =
		"absolute top-1/2 left-full ml-1 size-3.5 -translate-y-1/2 transition-[opacity,filter,scale,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

	return (
		<div
			data-enter="8"
			className="mount-5 mt-16 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between font-medium tight"
		>
			<p className="w-full md:max-w-[12.5rem]">Built by Chibuike ©2026</p>
			<button
				type="button"
				aria-label={copied ? "Email copied" : "Copy email address"}
				className="group relative flex max-w-full cursor-pointer items-center break-all rounded border border-transparent text-left text-pretty focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring sm:break-normal"
				onClick={copyEmail}
			>
				chibuikemaduabuchi2023@gmail.com
				<span aria-hidden="true" className="relative">
					<CopyIcon
						className={cn(
							iconClass,
							copied
								? "translate-x-0 scale-[0.25] opacity-0 blur-[0.25rem]"
								: "translate-x-0 scale-100 opacity-100 blur-none md:-translate-x-1 md:opacity-0 md:blur-[0.125rem] md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-hover:blur-none",
						)}
					/>
					<Check
						className={cn(
							iconClass,
							copied
								? "translate-x-0 scale-100 opacity-100 blur-none"
								: "translate-x-0 scale-[0.25] opacity-0 blur-[0.25rem]",
						)}
					/>
				</span>
			</button>
			<div>
				<span>{time}</span>
			</div>
		</div>
	);
}
