import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sans = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const themeInitScript = String.raw`
try {
	const root = document.documentElement;
	const media = window.matchMedia("(prefers-color-scheme: dark)");
	const applyTheme = () => {
		const shouldUseDark =
			root.dataset.theme === "dark" || (root.dataset.theme === "system" && media.matches);

		root.classList.toggle("dark", shouldUseDark);
		root.classList.toggle("light", !shouldUseDark);
	};

	root.dataset.theme = window.localStorage.getItem("theme") ?? "system";
	applyTheme();
	media.addEventListener("change", applyTheme);
} catch (_) {}
`;

export const metadata: Metadata = {
	metadataBase: new URL("https://chibu.dev"),
	title: {
		default: "Chibuike Maduabuchi",
		template: "%s - Chibuike Maduabuchi",
	},
	description:
		"Portfolio of Chibuike Maduabuchi, a design engineer blending design and code to build thoughtful digital products.",
	icons: {
		icon: [{ url: "/profile.png", type: "image/svg+xml", sizes: "any" }],
	},
	openGraph: {
		title: "Chibuike Maduabuchi - Design Engineer",
		description:
			"Product thinking, interface design, and frontend engineering for complex workflows and data-heavy interfaces.",
		url: "/",
		siteName: "Chibuike Maduabuchi",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Chibuike Maduabuchi - Design Engineer",
		description:
			"Product thinking, interface design, and frontend engineering for complex workflows and data-heavy interfaces.",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${sans.variable} antialiased`} suppressHydrationWarning>
			<head>
				<script type="text/javascript" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<noscript>
					<style>
						{"[data-case-reveal] { opacity: 1 !important; transform: none !important; }"}
					</style>
				</noscript>
			</head>
			<body>
				{children}
				<div
					aria-hidden="true"
					className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-30 select-none"
				>
					<div className="bottom-blur-layer bottom-blur-layer-1" />
					<div className="bottom-blur-layer bottom-blur-layer-2" />
					<div className="bottom-blur-layer bottom-blur-layer-3" />
					<div className="bottom-blur-layer bottom-blur-layer-4" />
					<div className="bottom-blur-layer bottom-blur-layer-5" />
					<div className="bottom-blur-layer bottom-blur-layer-6" />
					<div className="bottom-blur-fade" />
				</div>
				<Analytics />
			</body>
		</html>
	);
}
