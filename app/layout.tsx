import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

const mono = Geist_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

const themeInitScript = String.raw`
try {
	const theme = window.localStorage.getItem("theme");
	const shouldUseDark = theme === "dark";

	document.documentElement.classList.toggle("dark", shouldUseDark);
	document.documentElement.classList.toggle("light", !shouldUseDark);
} catch (_) {}
`;

export const metadata: Metadata = {
	metadataBase: new URL("https://chibuike-maduabuchi.vercel.app"),
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
		description: "AI systems, design engineering, and product-focused frontend work.",
		url: "https://chibuike-maduabuchi.vercel.app",
		siteName: "Chibuike Maduabuchi",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Chibuike Maduabuchi - Design Engineer",
		description: "AI systems, design engineering, and product-focused frontend work.",
		images: ["/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${mono.variable} antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script type="text/javascript" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
			</body>
		</html>
	);
}
