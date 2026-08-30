"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackToHome() {
	const router = useRouter();

	return (
		<button
			aria-label="Back to home"
			onClick={(event) => {
				event.preventDefault();
				router.back();
			}}
			className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-transparent bg-surface-muted px-4 py-2 transition-[background-color,scale] duration-150 ease-out hover:bg-surface-hover active:scale-96 focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
		>
			<ArrowLeft className="size-5" />
			<span className="sr-only">Back to home</span>
		</button>
	);
}
