"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const themes = [
	{ value: "system", label: "System", Icon: Monitor },
	{ value: "light", label: "Light", Icon: Sun },
	{ value: "dark", label: "Dark", Icon: Moon },
] as const;

const setTheme = (theme: (typeof themes)[number]["value"]) => {
	const root = document.documentElement;
	const shouldUseDark =
		theme === "dark" ||
		(theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

	if (theme === "system") window.localStorage.removeItem("theme");
	else window.localStorage.setItem("theme", theme);
	root.dataset.theme = theme;
	root.classList.toggle("dark", shouldUseDark);
	root.classList.toggle("light", !shouldUseDark);
};

export function ThemeSwitcher() {
	return (
		<fieldset className="relative flex rounded-full bg-surface-muted p-0.5">
			<legend className="sr-only">Select a display theme</legend>
			<span
				aria-hidden="true"
				data-theme-indicator
				className="absolute top-0.5 left-0.5 size-6 rounded-full bg-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
			/>
			<TooltipProvider>
				{themes.map(({ value, label, Icon }) => (
					<Tooltip key={value}>
						<TooltipTrigger
							render={(props) => (
								<label
									{...props}
									data-theme-option={value}
									className="relative flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
								>
									{props.children}
								</label>
							)}
						>
							<input
								type="radio"
								name="theme"
								value={value}
								defaultChecked={value === "system"}
								ref={(input) => {
									if (input) {
										const activeTheme = document.documentElement.dataset.theme ?? "system";
										input.checked = activeTheme === value;
									}
								}}
								onChange={() => setTheme(value)}
								className="sr-only"
							/>
							<Icon className="size-3.5" aria-hidden />
							<span className="sr-only">{label}</span>
						</TooltipTrigger>
						<TooltipContent sideOffset={13} className="max-md:hidden">
							{label}
							{value === "system" && (
								<>
									<span className="ml-1 opacity-60 [@media(prefers-color-scheme:dark)]:hidden">
										· Light
									</span>
									<span className="ml-1 hidden opacity-60 [@media(prefers-color-scheme:dark)]:inline">
										· Dark
									</span>
								</>
							)}
						</TooltipContent>
					</Tooltip>
				))}
			</TooltipProvider>
		</fieldset>
	);
}
