"use client";

import { useCopyEmail } from "@/hooks/use-copy-email";
import { Check, Copy } from "lucide-react";

export function CopyEmailButton() {
	const { copied, copyEmail } = useCopyEmail();

	return (
		<span className="relative inline-flex">
			<button
				type="button"
				className="social-pill reveal-link"
				aria-label="Copy email address"
				data-copied={copied || undefined}
				onClick={copyEmail}
			>
				Mail
				<span className="reveal-link-icon" aria-hidden="true">
					{copied ? <Check /> : <Copy />}
				</span>
			</button>
			<span className="copy-email-tooltip" data-visible={copied} aria-hidden="true">
				Copied
			</span>
			<output className="sr-only">{copied ? "Email copied to clipboard" : ""}</output>
		</span>
	);
}
