"use client";

import localFont from "next/font/local";
import { useState } from "react";
import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LogoIcon } from "@/icons/logo-icon";
import { cn } from "@/lib/utils";

const caveat = localFont({
	src: "../assets/fonts/caveat/caveat-core.woff2",
	weight: "500",
	style: "normal",
	display: "swap",
	adjustFontFallback: false,
	fallback: ["Caveat Fallback"],
	declarations: [
		{
			prop: "unicode-range",
			value: "U+20-7E,U+A0,U+A9,U+B7,U+2013-2014,U+2018-2019,U+201C-201D,U+2026",
		},
	],
});

const accents = [
	"graphite",
	"blue",
	"green",
	"amber",
	"red",
	"purple",
	"pink",
	"teal",
	"sky",
	"brown",
] as const;
type Accent = (typeof accents)[number];

// The name is a heading, which can't go inside a button, so the button's ::after stretches over the whole profile instead.
const triggerClass =
	"flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent-soft text-accent after:absolute after:inset-0 after:rounded-full";

export function AccentPicker() {
	const isDesktop = useMediaQuery("(min-width: 40rem)");
	const [accent, setAccent] = useState<Accent>(() =>
		typeof document === "undefined"
			? "graphite"
			: ((document.documentElement.dataset.accent as Accent | undefined) ?? "graphite"),
	);

	const swatches = (
		<fieldset className="grid grid-cols-[repeat(5,2.75rem)] justify-between gap-y-2 sm:grid-cols-[repeat(5,1.75rem)] sm:gap-x-1 sm:gap-y-1.5">
			<legend className="sr-only">Accent colour</legend>
			{accents.map((name) => {
				const selected = name === accent;
				return (
					<label
						key={name}
						data-accent={name}
						className="relative flex size-11 cursor-pointer items-center justify-center rounded-full sm:size-7"
					>
						<input
							type="radio"
							name="accent"
							value={name}
							checked={selected}
							onChange={() => {
								setAccent(name);
								const root = document.documentElement;
								try {
									if (name === "graphite") {
										delete root.dataset.accent;
										localStorage.removeItem("accent");
									} else {
										root.dataset.accent = name;
										localStorage.setItem("accent", name);
									}
								} catch {}
							}}
							className="sr-only"
						/>
						<span className="sr-only">{name}</span>
						<span
							className={cn(
								"rounded-full bg-(--accent-light) inset-ring inset-ring-black/6 dark:bg-(--accent-dark)",
								selected ? "size-7 sm:size-[18px]" : "size-8 sm:size-5",
							)}
						/>
						{selected && (
							<span className="absolute size-10 rounded-full inset-ring-2 inset-ring-(--accent-light) sm:size-7 dark:inset-ring-(--accent-dark)" />
						)}
					</label>
				);
			})}
		</fieldset>
	);

	return (
		<div className="relative flex items-center gap-2.5 rounded-full pr-3.5 transition-colors duration-150 ease-out has-data-popup-open:bg-surface-muted [@media(hover:hover)]:hover:bg-surface-muted">
			{isDesktop ? (
				<Popover>
					<PopoverTrigger aria-label="Change accent colour" className={triggerClass}>
						<LogoIcon />
					</PopoverTrigger>
					<PopoverContent align="start" sideOffset={10} className="rounded-[20px] p-1.5">
						{swatches}
					</PopoverContent>
				</Popover>
			) : (
				<Drawer>
					<DrawerTrigger aria-label="Change accent colour" className={triggerClass}>
						<LogoIcon />
					</DrawerTrigger>
					<DrawerContent>
						<div className="flex items-start justify-between">
							<div className="flex flex-col gap-1">
								<DrawerTitle>Accent colour</DrawerTitle>
								<DrawerDescription className="capitalize">{accent}</DrawerDescription>
							</div>
							<DrawerCloseButton />
						</div>
						{swatches}
					</DrawerContent>
				</Drawer>
			)}
			<div className="flex flex-col gap-2.5 font-medium">
				<h1 className="no-line-height tight text-foreground">Chibuike Maduabuchi</h1>
				<p className="no-line-height tight text-muted-foreground">Design Engineer</p>
			</div>
			<span
				data-js-only
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 animate-[hintIn_300ms_ease-out_1s_both] text-muted-foreground motion-reduce:animate-none"
			>
				<svg
					viewBox="0 0 42 42"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.75"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="absolute -top-[37px] left-[37px] size-[39px] sm:-top-10 sm:left-10 sm:size-[42px]"
				>
					<path d="M38 6C24 3 10 12 8 36" />
					<path d="M8 36L2.5 28.5M8 36L14.5 29.5" />
				</svg>
				<span
					className={cn(
						caveat.className,
						"absolute -top-[49px] left-[83px] -rotate-5 text-xl whitespace-nowrap sm:-top-[53px] sm:left-[90px] sm:text-[22px]",
					)}
				>
					click me
				</span>
			</span>
		</div>
	);
}
