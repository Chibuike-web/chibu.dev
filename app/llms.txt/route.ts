const markdown = `# Chibuike Maduabuchi

> Design engineer who designs and builds digital products with a strong focus on structure, usability, and craft. Works across product thinking, interface design, and frontend engineering, on complex workflows, data-heavy interfaces, and systems that need to feel simple without losing depth. Currently a Design Engineer at Roboto Studio, working with React, Next.js, TypeScript, and Sanity. Open to working with teams building applied AI products and systems.

## Case studies

- [Medibridge](https://chibu.dev/medibridge): A healthcare platform that turns paper, PDF, and image medical records into structured patient data and transfers them between hospitals with patient approval. Designed and built end to end.
- [Knowledge CI](https://chibu.dev/knowledge-ci): A Sanity Studio tool that rebuilds a Knowledge Base after every publish and shows editors which conflicts need a decision.
- [Bulk Airtime](https://chibu.dev/bulk-airtime): A bulk airtime transfer feature that lets people send airtime to multiple recipients in one transaction.

## Contact

- Email: chibuikemaduabuchi2023@gmail.com
- [GitHub](https://github.com/Chibuike-web)
- [LinkedIn](https://www.linkedin.com/in/chibuike-maduabuchi/)
- [Resume](https://chibu.dev/chibuike-maduabuchi-resume.pdf)

## When to use this site

- Finding a design engineer for applied AI products, healthcare software, or data-heavy dashboards and workflows.
- Checking Chibuike's work history, case studies, or resume before reaching out.
- Contacting Chibuike about full-time roles or freelance projects. Email is the fastest way to reach Chibuike, and the resume PDF has the full work history.
`;

export function GET() {
	return new Response(markdown, {
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
