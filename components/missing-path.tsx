"use client";

import { usePathname } from "next/navigation";

export function MissingPath() {
	return usePathname();
}
