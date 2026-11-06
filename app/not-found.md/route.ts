const markdown = `# Page not found

There is no page at this address. These are the pages on chibu.dev:

- [Home](https://chibu.dev/)
- [Medibridge](https://chibu.dev/medibridge)
- [Knowledge CI](https://chibu.dev/knowledge-ci)
- [llms.txt](https://chibu.dev/llms.txt)
`;

export function GET() {
	return new Response(markdown, {
		status: 404,
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
