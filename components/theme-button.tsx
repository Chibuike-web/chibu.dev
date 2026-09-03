"use client";

import { Moon, Sun } from "lucide-react";

const toggleTheme = () => {
	const isDark = document.documentElement.classList.contains("dark");
	const nextTheme = isDark ? "light" : "dark";

	window.localStorage.setItem("theme", nextTheme);
	document.documentElement.classList.toggle("dark", !isDark);
	document.documentElement.classList.toggle("light", isDark);
};

export function ThemeButton() {
	return (
		<button
			aria-label="Toggle theme"
			className="flex size-10 cursor-pointer items-center justify-center rounded-full duration-150 ease-out hover:bg-surface-muted active:scale-96 transition-all border border-transparent focus-visible:border-muted-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
			onClick={toggleTheme}
			type="button"
		>
			<Sun className="hidden size-5 text-foreground dark:block" />
			<Moon className="size-5 text-foreground dark:hidden" />
		</button>
	);
}
