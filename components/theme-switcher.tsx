"use client";

import { Monitor, Moon, Sun } from "lucide-react";

const themes = [
	{ value: "system", Icon: Monitor },
	{ value: "light", Icon: Sun },
	{ value: "dark", Icon: Moon },
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
				className="absolute top-0.5 left-0.5 size-8 rounded-full bg-background transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
			/>
			{themes.map(({ value, Icon }) => (
				<label
					key={value}
					data-theme-option={value}
					className="relative flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-muted-foreground"
				>
					<input
						type="radio"
						name="theme"
						value={value}
						ref={(input) => {
							if (input) {
								const activeTheme = document.documentElement.dataset.theme ?? "system";
								input.checked = activeTheme === value;
							}
						}}
						onChange={() => setTheme(value)}
						className="sr-only"
					/>
					<Icon className="size-4" aria-hidden />
					<span className="sr-only">{value}</span>
				</label>
			))}
		</fieldset>
	);
}
