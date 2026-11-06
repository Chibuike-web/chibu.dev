import { createHash } from "node:crypto";
import { skill } from "../about-chibuike/skill";

export function GET() {
	return Response.json(
		{
			$schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
			skills: [
				{
					name: "about-chibuike",
					type: "skill-md",
					description:
						"Answer questions about Chibuike Maduabuchi, a design engineer, and help someone get in touch about a role or project.",
					url: "https://chibu.dev/.well-known/agent-skills/about-chibuike/SKILL.md",
					digest: `sha256:${createHash("sha256").update(skill).digest("hex")}`,
				},
			],
		},
		{ headers: { "Access-Control-Allow-Origin": "*" } },
	);
}
