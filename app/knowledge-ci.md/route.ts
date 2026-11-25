const markdown = `---
title: Knowledge CI
description: How I built Knowledge CI, a Sanity Studio tool that checks a Knowledge Base for conflicts after every publish.
canonical: https://chibu.dev/knowledge-ci
last_updated: 2026-11-06
---

# Knowledge CI

Content checks for Sanity Knowledge Bases

Knowledge CI checks a Sanity Knowledge Base against the content it was built from. After every publish it rebuilds the Knowledge Base and lists the conflicts an editor has to decide.

## Why I built it

A Knowledge Base is a summary of a site’s content, and AI agents answer from that summary. A shop changes its returns policy from 30 days to 14 and publishes. The site updates at once. The Knowledge Base keeps saying 30 days, and so does the agent, until a customer complains.

I built this to answer one question after every content change: do the entries agents read still match the content? Sanity’s Knowledge Base is in beta, so the tool covers what the beta offers today.

## My role

Design Engineer. I designed and built it, from the backend to the Studio screen. The recordings use a rebuilt interface with sample data.

## Checks

The Checks screen lists conflicts and warnings, hidden issues, and the history of past runs. In the recording, a check runs and finds a new conflict.

Publishing in Sanity starts a check. The check rebuilds the Knowledge Base first and then reads the issues Sanity raises, so the result reflects the latest content.

Sanity’s issue list contains duplicates and issues quoting text that has left the entry. Knowledge CI merges the duplicates and marks those issues stale.

## Decisions

Each conflict shows the two claims side by side. An administrator picks a claim or dismisses the conflict, and Sanity follows that choice in later builds. Knowledge CI never decides which claim is true.

The Ask tab is a chat over the Knowledge Base, so an editor sees what an agent would answer. In the recording it calls snake plants safe for cats, then calls them toxic once the conflict is settled. Checks do not use an AI model.

The screen opens with one line saying whether the Knowledge Base can be trusted, followed by the conflicts. Sanity does not flag every conflict, so an empty list does not prove the content is right.

## Ask and Settings

Settings holds the Sanity token, the AI key, and MCP setup for Claude Code, Cursor, and Codex. Tokens stay encrypted on the backend, because anything kept in Studio reaches every Studio user.

## Previous

- [Orta](https://chibu.dev/orta.md)
`;

export function GET() {
	return new Response(markdown, {
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
