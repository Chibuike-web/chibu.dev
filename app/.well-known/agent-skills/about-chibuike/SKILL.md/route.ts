import { skill } from "../skill";

export function GET() {
	return new Response(skill, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
		},
	});
}
