const modelContext = document.modelContext ?? navigator.modelContext;

if (modelContext) {
	modelContext.registerTool({
		name: "get_profile",
		description:
			"Get Chibuike Maduabuchi's profile as markdown: summary, case studies, contact links and resume.",
		inputSchema: { type: "object", properties: {} },
		annotations: { readOnlyHint: true },
		async execute() {
			const text = await fetch("/llms.txt").then((res) => res.text());
			return { content: [{ type: "text", text }] };
		},
	});

	modelContext.registerTool({
		name: "get_case_study",
		description: "Get one of Chibuike's case studies as markdown.",
		inputSchema: {
			type: "object",
			properties: {
				slug: {
					type: "string",
					enum: ["orta", "knowledge-ci"],
					description: "Which case study to read.",
				},
			},
			required: ["slug"],
		},
		annotations: { readOnlyHint: true },
		async execute({ slug }) {
			const text = await fetch(`/${slug}.md`).then((res) => res.text());
			return { content: [{ type: "text", text }] };
		},
	});

	modelContext.registerTool({
		name: "open_email_draft",
		description:
			"Open the visitor's email app with a message to Chibuike filled in. The visitor reviews it and presses send. Subject and body are optional.",
		inputSchema: {
			type: "object",
			properties: {
				subject: {
					type: "string",
					description: 'Subject line. Defaults to "Working together".',
				},
				body: {
					type: "string",
					description: "Message text. Defaults to a greeting the visitor finishes.",
				},
			},
		},
		execute({ subject = "Working together", body = "Hi Chibuike,\n\n" } = {}) {
			window.location.href = `mailto:chibuikemaduabuchi2023@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			return {
				content: [{ type: "text", text: "Opened an email draft for the visitor to review." }],
			};
		},
	});
}
