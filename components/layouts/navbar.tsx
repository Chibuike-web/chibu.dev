import { LogoIcon } from "@/icons/logo-icon";
import { ThemeButton } from "../theme-button";

export function Navbar() {
	return (
		<div data-enter="0" className="mount-1 flex items-center justify-between">
			<div className="flex items-center gap-2.5">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-muted">
					<LogoIcon />
				</div>
				<div className="flex flex-col gap-2.5 font-medium">
					<p className="no-line-height tight text-foreground">Chibuike Maduabuchi</p>
					<p className="no-line-height tight text-muted-foreground">Design Engineer</p>
				</div>
			</div>
			<ThemeButton />
		</div>
	);
}
