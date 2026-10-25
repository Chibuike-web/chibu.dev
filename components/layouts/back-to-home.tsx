import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BackToHome() {
	return (
		<Link
			href="/"
			className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full border border-transparent bg-surface-muted px-4 py-2 transition-[background-color,scale] duration-150 ease-out hover:bg-surface-hover active:scale-96 focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
		>
			<ArrowLeft className="size-4" />
			<span className="sr-only">Back to home</span>
		</Link>
	);
}
