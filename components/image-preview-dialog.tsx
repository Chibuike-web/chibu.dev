"use client";

import { useCallback, type KeyboardEventHandler, type ReactNode } from "react";

export function ImagePreviewDialog({
	children,
	onClose,
	onKeyDown,
}: {
	children: ReactNode;
	onClose: () => void;
	onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
	const attachDialog = useCallback((dialog: HTMLDialogElement | null) => {
		if (!dialog) return;

		const trigger = document.activeElement;
		const rootOverflow = document.documentElement.style.overflow;
		const bodyOverflow = document.body.style.overflow;

		dialog.showModal();
		dialog.querySelector<HTMLButtonElement>("[data-preview-close]")?.focus({ preventScroll: true });
		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		return () => {
			dialog.close();
			document.documentElement.style.overflow = rootOverflow;
			document.body.style.overflow = bodyOverflow;
			if (trigger instanceof HTMLElement && trigger.isConnected) {
				trigger.focus({ preventScroll: true });
			}
		};
	}, []);

	return (
		<dialog
			ref={attachDialog}
			aria-label="Image preview"
			className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden border-0 bg-transparent p-0 text-foreground outline-none backdrop:bg-transparent"
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onKeyDown={onKeyDown}
		>
			{children}
		</dialog>
	);
}
