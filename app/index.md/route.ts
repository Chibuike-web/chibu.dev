import { llms } from "../llms.txt/llms";

const markdown = `---
title: Chibuike Maduabuchi
description: Design engineer who designs and builds digital products with a strong focus on structure, usability, and craft.
canonical: https://chibu.dev/
last_updated: 2026-11-20
---

${llms}`;

export function GET() {
	return new Response(markdown, {
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
