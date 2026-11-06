const modelContext = navigator.modelContext;

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
		name: "draft_email",
		description:
			"Open the visitor's email app with a message to Chibuike filled in. The visitor reviews it and presses send. Subject and body are optional.",
		inputSchema: {
			type: "object",
			properties: {
				subject: { type: "string" },
				body: { type: "string" },
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
