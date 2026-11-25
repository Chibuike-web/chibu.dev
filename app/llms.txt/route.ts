import { llms } from "./llms";

export function GET() {
	return new Response(llms, {
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
