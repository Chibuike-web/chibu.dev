"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function MissingPath() {
	return useSyncExternalStore(
		subscribe,
		() => window.location.pathname,
		() => "this page",
	);
}
