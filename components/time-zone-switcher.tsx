"use client";

import { Drawer } from "@base-ui/react/drawer";
import { Popover } from "@base-ui/react/popover";
import { ChevronDown, Clock, X } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

const myZone = { timeZone: "Africa/Lagos", city: "Enugu" };

const pillClass =
	"group flex h-9 items-center gap-[5px] rounded-full bg-surface-muted pr-3 pl-2.5 text-[13px] font-semibold tabular-nums transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted-foreground data-popup-open:bg-surface-hover md:gap-1.5 md:pr-4 md:pl-3 md:text-sm [@media(hover:hover)]:hover:bg-surface-hover";

function Pill({ time }: { time: string }) {
	return (
		<>
			<Clock className="size-[15px] md:size-4" aria-hidden />
			{time}
			<span className="sr-only">, change time zone</span>
			<ChevronDown
				className="size-[13px] text-muted-foreground transition-transform duration-150 group-data-popup-open:rotate-180 md:size-3.5"
				aria-hidden
			/>
		</>
	);
}

function readZone(date: Date, timeZone: string) {
	const part = Object.fromEntries(
		new Intl.DateTimeFormat("en-US", {
			timeZone,
			hourCycle: "h23",
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		})
			.formatToParts(date)
			.map(({ type, value }) => [type, Number(value)]),
	);
	const wall = Date.UTC(part.year, part.month - 1, part.day, part.hour, part.minute);

	return {
		minutes: part.hour * 60 + part.minute,
		offset: (wall - Math.floor(date.getTime() / 60000) * 60000) / 60000,
		time: `${String(part.hour % 12 || 12).padStart(2, "0")}:${String(part.minute).padStart(2, "0")}${part.hour < 12 ? "AM" : "PM"}`,
		date: new Intl.DateTimeFormat("en-GB", { timeZone, day: "numeric", month: "short" }).format(date),
	};
}

type Zone = ReturnType<typeof readZone> & { city: string };

export function TimeZoneSwitcher() {
	const now = useNow();
	const isDesktop = useMediaQuery("(min-width: 48rem)");
	const [showMine, setShowMine] = useState(() => {
		try {
			return localStorage.getItem("clock-zone") === "mine";
		} catch {
			return false;
		}
	});

	if (!now) {
		return (
			<div data-js-only className={cn(pillClass, "invisible")}>
				<Pill time="00:00AM" />
			</div>
		);
	}

	const visitorZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const yours = {
		...readZone(now, visitorZone),
		city: visitorZone.split("/").pop()!.replaceAll("_", " "),
	};
	const mine = { ...readZone(now, myZone.timeZone), city: myZone.city };
	const shown = showMine ? mine : yours;
	const gapMinutes = Math.abs(mine.offset - yours.offset);
	const gap = gapMinutes
		? `${Math.floor(gapMinutes / 60)}h${gapMinutes % 60 ? ` ${gapMinutes % 60}m` : ""} apart`
		: "Same time zone";

	const choose = (mineChosen: boolean) => {
		setShowMine(mineChosen);
		try {
			localStorage.setItem("clock-zone", mineChosen ? "mine" : "yours");
		} catch {}
	};
	const track = <DayTrack yours={yours} mine={mine} showMine={showMine} onChoose={choose} />;

	if (isDesktop) {
		return (
			<Popover.Root>
				<Popover.Trigger data-js-only className={pillClass}>
					<Pill time={shown.time} />
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner side="bottom" align="end" sideOffset={8} className="z-40">
						<Popover.Popup className="flex w-75 flex-col gap-3.5 rounded-[26px] border border-border bg-background p-3.5 shadow-[0_8px_24px_#0000001a] outline-none transition-[opacity,translate] duration-150 ease-[cubic-bezier(0.19,1,0.22,1)] data-ending-style:-translate-y-1 data-ending-style:opacity-0 data-starting-style:-translate-y-1 data-starting-style:opacity-0 motion-reduce:transition-none dark:shadow-[0_8px_24px_#00000080]">
							<div className="flex items-center justify-between text-xs">
								<span className="font-medium text-muted-foreground">Today, {shown.date}</span>
								<span className="font-semibold">{gap}</span>
							</div>
							{track}
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
		);
	}

	return (
		<Drawer.Root>
			<Drawer.Trigger data-js-only className={pillClass}>
				<Pill time={shown.time} />
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-black opacity-[calc(0.35*(1-var(--drawer-swipe-progress)))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-swiping:duration-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none supports-[-webkit-touch-callout:none]:absolute" />
				<Drawer.Viewport className="fixed inset-0 z-50 flex items-end">
					<Drawer.Popup className="-mb-12 flex w-full flex-col gap-4.5 rounded-t-3xl bg-background px-5 pt-2 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px)+3rem)] shadow-[0_-4px_24px_#0000001a] outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-starting-style:[transform:translateY(calc(100%-3rem+2px))] data-ending-style:[transform:translateY(calc(100%-3rem+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] motion-reduce:transition-none dark:shadow-[0_-4px_24px_#00000080]">
						<div className="mx-auto -mb-2 h-1 w-9 rounded-full bg-surface-hover" />
						<div className="flex items-start justify-between">
							<div className="flex flex-col gap-1">
								<Drawer.Title className="text-[17px] font-semibold tracking-[-0.3px]">
									Time zone
								</Drawer.Title>
								<Drawer.Description className="text-[13px] text-muted-foreground">
									Today, {shown.date} · {gap}
								</Drawer.Description>
							</div>
							<Drawer.Close
								aria-label="Close"
								className="-m-1.5 flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-muted-foreground"
							>
								<span className="flex size-8 items-center justify-center rounded-full bg-surface-muted">
									<X className="size-4 text-muted-foreground" aria-hidden />
								</span>
							</Drawer.Close>
						</div>
						{track}
					</Drawer.Popup>
				</Drawer.Viewport>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

function DayTrack({
	yours,
	mine,
	showMine,
	onChoose,
}: {
	yours: Zone;
	mine: Zone;
	showMine: boolean;
	onChoose: (mine: boolean) => void;
}) {
	const you = (yours.minutes / 1440) * 100;
	const me = (mine.minutes / 1440) * 100;
	const start = Math.min(you, me);
	const end = Math.max(you, me);
	const wraps = Math.abs(mine.minutes - yours.minutes) !== Math.abs(mine.offset - yours.offset);
	const bars = wraps
		? [
				[0, start],
				[end, 100],
			]
		: [[start, end]];

	return (
		<>
			<div className="flex flex-col gap-2.5 md:gap-3.5">
				<div className="relative h-13 [--day:#f2c46b] [--night:#4a5a8c] dark:[--day:#d9a848] dark:[--night:#3a4878]">
					<div className="absolute inset-x-0 top-5.5 h-2 rounded bg-[linear-gradient(to_right,var(--night)_20%,var(--day)_32%,var(--day)_72%,var(--night)_84%)]" />
					{bars.map(([from, to]) => (
						<div
							key={from}
							className="absolute top-6 h-1 rounded-sm bg-white/55"
							style={{ left: `${from}%`, width: `${to - from}%` }}
						/>
					))}
					<span
						className="absolute top-0 -translate-x-1/2 text-[11px] font-semibold"
						style={{ left: `${you}%` }}
					>
						You
					</span>
					<span
						className="absolute top-[19px] size-3.5 -translate-x-1/2 rounded-full border-[2.5px] border-foreground bg-background"
						style={{ left: `${you}%` }}
					/>
					<span
						className="absolute top-[19px] size-3.5 -translate-x-1/2 rounded-full border-[2.5px] border-foreground bg-background"
						style={{ left: `${me}%` }}
					/>
					<span
						className="absolute top-9.5 -translate-x-1/2 text-[11px] font-semibold"
						style={{ left: `${me}%` }}
					>
						Me
					</span>
				</div>
				<div className="flex justify-between text-[10px] font-medium text-muted-foreground">
					{["12AM", "6AM", "12PM", "6PM", "12AM"].map((label, index) => (
						<span key={index}>{label}</span>
					))}
				</div>
			</div>
			<fieldset className="relative grid grid-cols-2 rounded-[14px] bg-surface-muted p-1 md:rounded-xl md:p-[3px]">
				<legend className="sr-only">Clock time zone</legend>
				<span
					aria-hidden="true"
					className={cn(
						"absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-[10px] bg-background shadow-[0_0_3px_#0000001a] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none md:inset-y-[3px] md:left-[3px] md:w-[calc(50%-3px)] md:rounded-[9px] dark:shadow-[0_0_3px_#00000080]",
						showMine && "translate-x-full",
					)}
				/>
				{[
					{ title: "Your time", zone: yours, mineOption: false },
					{ title: "My time", zone: mine, mineOption: true },
				].map(({ title, zone, mineOption }) => (
					<label
						key={title}
						className="relative flex h-14 cursor-pointer flex-col justify-center gap-[3px] rounded-[10px] px-3 has-focus-visible:outline-2 has-focus-visible:outline-muted-foreground md:h-auto md:rounded-[9px] md:px-2.5 md:py-[7px]"
					>
						<input
							type="radio"
							name="clock-zone"
							checked={showMine === mineOption}
							onChange={() => onChoose(mineOption)}
							className="sr-only"
						/>
						<span
							className={cn(
								"text-sm font-semibold tracking-[-0.14px] transition-colors md:text-[13px]",
								showMine === mineOption ? "text-foreground" : "text-muted-foreground",
							)}
						>
							{title}
						</span>
						<span className="text-xs text-muted-foreground md:text-[11px]">
							{zone.time} · {zone.city}
						</span>
					</label>
				))}
			</fieldset>
		</>
	);
}
