import first from "@/assets/nomba/first.webp";
import second from "@/assets/nomba/second.webp";
import third from "@/assets/nomba/third.webp";
import fourth from "@/assets/nomba/fourth.webp";
import fifth from "@/assets/nomba/fifth.webp";
import sixth from "@/assets/nomba/sixth.webp";
import seventh from "@/assets/nomba/seventh.webp";
import eighth from "@/assets/nomba/eighth.webp";
import ninth from "@/assets/nomba/ninth.webp";
import tenth from "@/assets/nomba/tenth.webp";
import eleventh from "@/assets/nomba/eleventh.webp";
import twelfth from "@/assets/nomba/twelfth.webp";
import { Tag } from "@/components/tag";
import { ZoomableImage } from "@/components/zoomable-image";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ProgressBar from "@/components/progress-bar";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { ThemeButton } from "@/components/theme-button";

export const prefetch = "allow-runtime";

const headingClass = "text-[1.125rem] font-medium tight text-balance";
const bodyClass = "font-medium tight text-muted-foreground text-pretty";
const detailListClass = "my-6 rounded-xl bg-surface-muted p-4";
const detailItemClass = "font-medium tight text-muted-foreground";
const feedbackItemClass = "mt-6 flex items-start gap-4 sm:gap-6";
const feedbackNumberClass =
	"block min-w-10 rounded-full border border-surface-hover bg-surface-muted px-4 py-1.5 text-center tabular-nums";

const navItems = [
	{
		id: "overview",
		label: "Overview",
	},
	{
		id: "selecting-recipients-from-contacts",
		label: "Selecting Recipients from Contacts",
	},
	{
		id: "manually-entering-phone-numbers",
		label: "Manually Entering Phone Numbers",
	},
	{
		id: "recipient-management",
		label: "Recipient Management",
	},
	{
		id: "payment-review",
		label: "Payment Review",
	},

	{
		id: "transaction-summary-details",
		label: "Transaction Summary & Details",
	},
	{
		id: "design-feedback-iterations",
		label: "Design Feedback & Iterations",
	},
];

export default function NombaPage() {
	return (
		<main className="page-shell">
			<nav className="mount-1 flex items-center justify-between">
				<Link
					href="/"
					prefetch={true}
					aria-label="Back to home"
					className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full bg-surface-muted px-4 py-2 transition-colors duration-150 ease-out hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<ArrowLeft className="size-5" />
					<span className="sr-only">Back to home</span>
				</Link>
				<ThemeButton />
			</nav>
			<header className="mount-2 my-16 md:my-22">
				<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col gap-3">
						<h1 className="text-[1.125rem] font-semibold tight text-balance">Nomba</h1>
						<div className="flex items-center gap-1.5">
							<p className="text-[1rem] font-medium text-muted-foreground tight no-line-height">
								Bulk Airtime Transfer
							</p>
							<span className="size-0.5 rounded-full bg-muted-foreground flex shrink-0" />
							<p className="text-[1rem] font-medium text-muted-foreground tight no-line-height">
								2024
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Tag key={tag.label} label={tag.label} color={tag.color} bgColor={tag.bgColor} />
						))}
					</div>
				</div>
			</header>
			<section
				id="overview"
				className="mount-3 my-22 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8"
			>
				<div className="flex w-full flex-col gap-2">
					<p className="font-secondary font-semibold text-foreground">PROBLEM STATEMENT</p>
					<p className={bodyClass}>
						Demola, a frequent airtime sender, faces a stressful and time-consuming process of
						sending airtime to each recipient individually. This repetitive task becomes especially
						inefficient during special occasions like birthdays, when he needs to send airtime to a
						long list of friends and family. To address this pain point, I designed a feature that
						simplifies the process by enabling him to send airtime to multiple recipients in a
						single transaction.
					</p>
				</div>
				<div className="flex w-full flex-col gap-2">
					<p className="font-secondary font-semibold text-foreground">OBJECTIVE</p>
					<p className={bodyClass}>
						Design a simple and efficient mobile feature that allows users to send airtime to
						multiple recipients at once, streamlining the process and reducing the time and effort
						required for a user who regularly sends airtime to a large number of people.
					</p>
				</div>
				<div className="flex w-full flex-col gap-2">
					<p className="font-secondary font-semibold text-foreground">SOLUTION OVERVIEW</p>
					<p className={bodyClass}>
						To address Demola&apos;s pain points and create a more efficient way to send airtime to
						multiple recipients, I designed a feature that enables users to send airtime to several
						recipients in a single transaction. This feature is built around two primary solutions
						for ease of use and flexibility.
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2">
					<div className="flex w-full flex-col gap-2">
						<p className="font-secondary font-semibold text-foreground">ROLE</p>
						<p className="font-medium text-muted-foreground tight">Product Designer</p>
					</div>
					<div className="flex w-full flex-col gap-2">
						<p className="font-secondary font-semibold text-foreground">DURATION</p>
						<p className="font-medium text-muted-foreground tight">1 week</p>
					</div>
				</div>
			</section>
			<section id="selecting-recipients-from-contacts">
				<div className="flex flex-col gap-3">
					<h2 className={headingClass}>Selecting Recipients from Contacts</h2>
					<p className={bodyClass}>
						In this flow, users can select recipients directly from their saved contact list. By
						tapping the &quot;Select from Contacts&quot; option, they are taken to a dedicated
						screen displaying their full contact list. From there, users can select multiple
						recipients with ease. The selected contacts are then displayed as chips on the next
						screen, providing a clear visual summary for review.
					</p>
				</div>
				<ul className={detailListClass}>
					<li>
						<span className="font-medium text-foreground">User Action:</span>{" "}
						<span className={detailItemClass}>Select recipients from the contact list.</span>
					</li>
					<li className="mt-3">
						<span className="font-medium text-foreground">Output:</span>{" "}
						<span className={detailItemClass}>
							Selected contacts are displayed as chips on the next screen, where users can review
							and proceed with entering airtime details.
						</span>
					</li>
				</ul>
				<p className={cn(bodyClass, "mb-6")}>
					I used familiar interaction patterns to keep the process intuitive and quick. The
					experience focused on speed and flexibility, with features like quick selection, search,
					and bulk actions to make managing multiple recipients feel smooth and efficient.
				</p>
				<ZoomableImage
					src={first}
					width={3000}
					height={1800}
					alt="Multi-recipient transfer flow showing contact selection and a list of recipients with multiple contacts selected."
				/>
			</section>
			<section id="manually-entering-phone-numbers" className="mt-22">
				<div className="flex flex-col gap-3">
					<h2 className={headingClass}>Manually Entering Phone Numbers</h2>
					<p className={bodyClass}>
						For users who prefer to enter numbers manually, this option allows them to input
						multiple phone numbers at once by separating them with commas. It&apos;s designed to
						accommodate cases where recipients are not saved in the user&apos;s contact list,
						offering greater flexibility and control over the input process.
					</p>
				</div>
				<ul className={detailListClass}>
					<li>
						<span className="font-medium text-foreground">User Action:</span>{" "}
						<span className={detailItemClass}>
							Manually enter phone numbers, separated by commas.
						</span>
					</li>
					<li className="mt-3">
						<span className="font-medium text-foreground">Output:</span>{" "}
						<span className={detailItemClass}>
							Entered phone numbers are displayed as chips on the next screen, where users can
							review and proceed with selecting a provider and entering the airtime amount.
						</span>
					</li>
				</ul>
				<p className={cn(bodyClass, "mb-6")}>
					Entering several numbers at once can be tedious, so I designed the input to accept
					comma-separated entries. This keeps the process quick and gives users a clear way to
					review what they&apos;ve added before continuing.
				</p>
				<ZoomableImage
					src={second}
					width={3000}
					height={1800}
					alt="Screen for entering multiple recipient phone numbers for an airtime purchase."
				/>
			</section>
			<section id="recipient-management" className="mt-22">
				<h2 className={cn(headingClass, "mb-3")}>Recipient Management</h2>
				<p className={cn(bodyClass, "mb-6")}>
					I designed the screen to give users a clear overview of their transfer before they
					continue. Recipient tags make selected contacts easy to track, while separating provider,
					deal, and amount selection keeps the experience simple and easy to scan.
				</p>
				<ZoomableImage
					src={third}
					width={3000}
					height={1800}
					alt="Screen showing selected recipients and transfer details before purchase."
				/>
			</section>
			<section id="payment-review" className="mt-22">
				<h2 className={cn(headingClass, "mb-3")}>Payment Review</h2>
				<p className={cn(bodyClass, "mb-6")}>
					Before payment, users need a chance to verify that everything is correct. I designed the
					review screen to present all recipients, network providers, and airtime amounts in a
					clear, scannable format, making it easy to spot mistakes and make changes if needed. The
					payment sheet provides a final summary of the total amount, cashback reward, and payment
					method, giving users confidence before they complete the transaction.
				</p>
				<ZoomableImage
					src={fourth}
					width={3000}
					height={1800}
					alt="Payment review screen summarizing recipients, airtime amounts, and total cost."
				/>
			</section>
			<section id="transaction-summary-details" className="mt-22">
				<h2 className={cn(headingClass, "mb-3")}>Transaction Summary & Details</h2>
				<p className={cn(bodyClass, "mb-6")}>
					The flow makes it easy to review transaction results without feeling overwhelming. The
					summary screen shows the status of all completed transactions in one place, while
					individual detail screens provide more information such as the recipient, payment method,
					transaction ID, and date. This helps users quickly confirm their transactions and dig
					deeper only when they need to.
				</p>
				<ZoomableImage
					src={fifth}
					width={3000}
					height={1800}
					alt="Transaction summary and details screen for completed airtime transfers."
				/>
			</section>
			<section id="design-feedback-iterations" className="mt-22">
				<h2 className={cn(headingClass, "mb-3")}>Design Feedback & Iterations</h2>
				<p className={bodyClass}>
					During design reviews, I received useful feedback that helped shape the interaction
					patterns on the Send Airtime screen. Some key insights included:
				</p>

				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						The cancel (remove) button on each chip had a small tap target and was not visually
						prominent. Additionally, adding the button to all chips, including non-selected ones,
						reduced the emphasis on the highlighted chip and increased the risk of accidentally
						removing the wrong recipient.
					</p>
				</div>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						Allowing users to manually select the mobile provider was flagged as unnecessary, since
						the provider can be determined automatically on the backend using the phone number.
						Leaving this step to the user introduced potential errors, such as selecting the wrong
						provider for a number or contact.
					</p>
				</div>
				<ZoomableImage
					src={sixth}
					width={3000}
					height={1800}
					alt="Iteration showing chip removal states and provider handling improvements."
				/>

				<p className={cn(bodyClass, "mt-6")}>I made the following improvements:</p>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						The cancel button was updated with a white highlight to make it more visible and
						distinguishable. To reduce accidental removals, I removed the cancel button from all
						non-selected chips. Now, only the highlighted chip displays the cancel button, ensuring
						users can remove recipients intentionally.
					</p>
				</div>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						Instead of allowing users to select a mobile provider manually, the system now detects
						and displays the provider automatically based on the phone number. The provider is shown
						on the chip next to the contact or number, eliminating user error and streamlining the
						process.
					</p>
				</div>
				<ZoomableImage
					src={seventh}
					width={3000}
					height={1800}
					alt="Updated chip design showing clearer removal affordance and automatic provider labels."
				/>

				<p className={cn(bodyClass, "my-6")}>
					The designer also pointed out usability issues with the manual phone number entry flow. He
					raised concerns about what would happen if a user entered a comma too early, added it
					after an incomplete number, or forgot to include a comma altogether. Additionally, there
					was no visual feedback to indicate whether a number had been successfully recognized and
					recorded by the system.
				</p>
				<ZoomableImage
					src={eighth}
					width={3000}
					height={1800}
					alt="Manual entry flow with validation and helper messaging concepts."
				/>

				<p className={cn(bodyClass, "mt-6")}>
					I made a few key improvements based on this feedback:
				</p>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						To support first-time users or those unsure about the format, I added a helper icon
						beside the input field. When tapped, it opens a bottom sheet explaining how to properly
						enter multiple numbers using commas, along with examples and tips for avoiding
						formatting errors.
					</p>
				</div>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						For edge cases such as entering a comma too early, forgetting it altogether, or
						inputting incomplete numbers, I implemented validation rules. The system now flags any
						number that is fewer than 11 digits, prompting users to complete or correct it.
					</p>
				</div>
				<ZoomableImage
					src={ninth}
					width={3000}
					height={1800}
					alt="Validation states for incomplete or malformed phone number input."
				/>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>3</span>
					<p className={bodyClass}>
						If a user types more than 11 digits without a comma, the system displays a warning and
						prompts them to insert the appropriate separator to avoid number merging or
						misinterpretation.
					</p>
				</div>
				<div className={feedbackItemClass}>
					<span className={feedbackNumberClass}>4</span>
					<p className={cn(bodyClass, "mb-6")}>
						Each valid phone number is automatically converted into a chip once it reaches 11 digits
						and is followed by a comma. This gives users instant visual feedback that the number has
						been successfully recognized and recorded.
					</p>
				</div>
				<div className="flex flex-col gap-22">
					<ZoomableImage
						src={tenth}
						width={3000}
						height={1800}
						alt="Warning state shown when digits run together without a separating comma."
					/>
					<ZoomableImage
						src={eleventh}
						width={3000}
						height={1800}
						alt="Recognized phone numbers converted into chips for instant confirmation."
					/>
					<ZoomableImage
						src={twelfth}
						width={3000}
						height={1800}
						alt="Final improved manual entry flow showing recognized recipients ready for review."
					/>
				</div>
			</section>
			<Link href="/medibridge" prefetch={true} className="case-study-nav-card">
				<div className="flex flex-col gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Next</p>
					<p className="text-foreground font-medium no-line-height">Medibridge</p>
				</div>
				<ArrowUpRight className="size-6" />
			</Link>
			<Suspense>
				<Progress />
			</Suspense>
		</main>
	);
}

const tags = [
	{
		label: "Design",
		color: "var(--blue)",
		bgColor: "var(--blue-muted)",
	},
	{
		label: "Mobile App",
		color: "var(--amber)",
		bgColor: "var(--amber-muted)",
	},
];

async function Progress() {
	const cookieStore = await cookies();
	const stored = cookieStore.get("isExpandedValue")?.value;
	return <ProgressBar items={navItems} initialState={stored} />;
}
