"use client";

import { useCopyEmail } from "@/hooks/use-copy-email";
import { Copy } from "lucide-react";

export function CopyEmailButton() {
	const { copied, copyEmail } = useCopyEmail();

	return (
		<>
			<span className="relative inline-flex" data-js-only>
				<button
					type="button"
					className="social-pill reveal-link"
					aria-label="Copy email address"
					onClick={copyEmail}
				>
					Mail
					<span className="reveal-link-icon" aria-hidden="true">
						<Copy />
					</span>
				</button>
				<span className="copy-email-tooltip" data-visible={copied} aria-hidden="true">
					Copied
				</span>
				<output className="sr-only">{copied ? "Email copied to clipboard" : ""}</output>
			</span>
			<noscript>
				<details className="native-email relative">
					<summary className="social-pill reveal-link list-none">Mail</summary>
					<div className="native-email-panel">
						<label className="block text-sm" htmlFor="email-without-javascript">
							Email address
						</label>
						<input
							id="email-without-javascript"
							type="text"
							readOnly
							value="chibuikemaduabuchi2023@gmail.com"
							className="mt-2 w-full rounded border border-border bg-surface-muted px-2 py-2 text-base text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted-foreground"
						/>
						<p className="mt-2 text-xs text-muted-foreground">Select the address to copy it.</p>
					</div>
				</details>
			</noscript>
		</>
	);
}
