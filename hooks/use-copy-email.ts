"use client";

import { useEffect, useRef, useState } from "react";

export function useCopyEmail() {
	const [copied, setCopied] = useState(false);
	const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (resetTimer.current !== null) clearTimeout(resetTimer.current);
		};
	}, []);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText("chibuikemaduabuchi2023@gmail.com");
			if (resetTimer.current !== null) clearTimeout(resetTimer.current);
			setCopied(true);
			resetTimer.current = setTimeout(() => {
				setCopied(false);
				resetTimer.current = null;
			}, 2000);
		} catch {
			setCopied(false);
		}
	};

	return { copied, copyEmail };
}
