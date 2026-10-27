"use client";

import { ChevronDown, Clock } from "lucide-react";
import { Suspense, use, useState } from "react";
import { browser } from "react-dom";
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
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

const myZone = { timeZone: "Africa/Lagos", city: "Enugu" };

const pillClass =
	"group -mr-3 flex h-9 items-center gap-[5px] rounded-full pr-3 pl-2.5 text-[13px] font-semibold tabular-nums transition-colors duration-150 ease-out data-popup-open:bg-surface-hover sm:-mr-4 sm:gap-1.5 sm:pr-4 sm:pl-3 sm:text-sm [@media(hover:hover)]:hover:bg-surface-hover";

function Pill({ time }: { time: string }) {
	return (
		<>
			<Clock className="size-[15px] text-accent sm:size-4" aria-hidden />
			{time}
			<span className="sr-only">, change time zone</span>
			<ChevronDown
				className="size-[13px] text-muted-foreground transition-transform duration-150 group-data-popup-open:rotate-180 sm:size-3.5"
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

	return {
		wall: Date.UTC(part.year, part.month - 1, part.day, part.hour, part.minute) / 60000,
		minutes: part.hour * 60 + part.minute,
		time: `${String(part.hour % 12 || 12).padStart(2, "0")}:${String(part.minute).padStart(2, "0")}${part.hour < 12 ? "AM" : "PM"}`,
		date: new Intl.DateTimeFormat("en-GB", { timeZone, day: "numeric", month: "short" }).format(
			date,
		),
	};
}

type Zone = ReturnType<typeof readZone> & { city: string };

export function TimeZoneSwitcher() {
	return (
		<Suspense
			fallback={
				<div data-js-only className={cn(pillClass, "invisible")}>
					<Pill time="00:00AM" />
				</div>
			}
		>
			<ZoneClock />
		</Suspense>
	);
}

function ZoneClock() {
	use(browser("The clock shows the visitor's local time."));
	const now = useNow();
	const isDesktop = useMediaQuery("(min-width: 40rem)");
	const [showMine, setShowMine] = useState(() => {
		try {
			return localStorage.getItem("clock-zone") === "mine";
		} catch {
			return false;
		}
	});

	const visitorZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
	const yours = {
		...readZone(now, visitorZone),
		city: visitorZone.split("/").pop()!.replaceAll("_", " "),
	};
	const mine = { ...readZone(now, myZone.timeZone), city: myZone.city };
	const shown = showMine ? mine : yours;
	const gapMinutes = Math.abs(mine.wall - yours.wall);
	const hours = Math.floor(gapMinutes / 60);
	const extraMinutes = gapMinutes % 60;
	const gap = gapMinutes
		? `${hours}h${extraMinutes ? ` ${extraMinutes}m` : ""} apart`
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
			<Popover>
				<PopoverTrigger data-js-only className={pillClass}>
					<Pill time={shown.time} />
				</PopoverTrigger>
				<PopoverContent
					align="end"
					className={cn("flex flex-col gap-3.5", gapMinutes ? "w-75" : "w-85")}
				>
					<div className="flex items-center justify-between text-xs">
						<span className="font-medium text-muted-foreground">Today, {shown.date}</span>
						<span className="font-semibold">{gap}</span>
					</div>
					{track}
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger data-js-only className={pillClass}>
				<Pill time={shown.time} />
			</DrawerTrigger>
			<DrawerContent>
				<div className="flex items-start justify-between">
					<div className="flex flex-col gap-1">
						<DrawerTitle>Time zone</DrawerTitle>
						<DrawerDescription>
							Today, {shown.date} · {gap}
						</DrawerDescription>
					</div>
					<DrawerCloseButton />
				</div>
				{track}
			</DrawerContent>
		</Drawer>
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
	const same = mine.wall === yours.wall;
	const you = (yours.minutes / 1440) * 100;
	const me = (mine.minutes / 1440) * 100;
	const start = Math.min(you, me);
	const end = Math.max(you, me);
	const wraps = mine.date !== yours.date;
	const bars = wraps
		? [
				[0, start],
				[end, 100],
			]
		: [[start, end]];

	return (
		<>
			<div className="flex flex-col gap-2.5 sm:gap-3.5">
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
						className="absolute top-[19px] size-3.5 -translate-x-1/2 rounded-full border-[2.5px] border-accent bg-background"
						style={{ left: `${you}%` }}
					/>
					<span
						className="absolute top-[19px] size-3.5 -translate-x-1/2 rounded-full border-[2.5px] border-accent bg-background"
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
					<span>12AM</span>
					<span>6AM</span>
					<span>12PM</span>
					<span>6PM</span>
					<span>12AM</span>
				</div>
			</div>
			{same ? (
				<p className="rounded-xl bg-surface-muted px-3 py-2.5 text-[13px] font-medium text-muted-foreground sm:text-xs">
					We're on the same clock: {mine.time} in {mine.city}
				</p>
			) : (
				<fieldset className="relative grid grid-cols-2 rounded-[14px] bg-surface-muted p-1 sm:rounded-xl sm:p-[3px]">
					<legend className="sr-only">Clock time zone</legend>
					<span
						aria-hidden="true"
						className={cn(
							"absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-[10px] bg-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:inset-y-[3px] sm:left-[3px] sm:w-[calc(50%-3px)] sm:rounded-[9px]",
							showMine && "translate-x-full",
						)}
					/>
					{[
						{ title: "Your time", zone: yours, mineOption: false },
						{ title: "My time", zone: mine, mineOption: true },
					].map(({ title, zone, mineOption }) => (
						<label
							key={title}
							className="relative flex h-14 cursor-pointer flex-col justify-center gap-[3px] rounded-[10px] px-3 sm:h-auto sm:rounded-[9px] sm:px-2.5 sm:py-[7px]"
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
									"text-sm font-semibold tracking-[-0.14px] transition-colors sm:text-[13px]",
									showMine === mineOption ? "text-accent" : "text-muted-foreground",
								)}
							>
								{title}
							</span>
							<span className="text-xs text-muted-foreground sm:text-[11px]">
								{zone.time} · {zone.city}
							</span>
						</label>
					))}
				</fieldset>
			)}
		</>
	);
}
