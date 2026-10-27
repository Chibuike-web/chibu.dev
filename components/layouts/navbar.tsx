import { AccentPicker } from "../accent-picker";
import { TimeZoneSwitcher } from "../time-zone-switcher";

export function Navbar() {
	return (
		<div data-enter="0" className="mount-1 flex items-center justify-between">
			<AccentPicker />
			<TimeZoneSwitcher />
		</div>
	);
}
