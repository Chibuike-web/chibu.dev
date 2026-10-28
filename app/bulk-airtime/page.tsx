import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import first from "@/assets/bulk-airtime/first.webp";
import second from "@/assets/bulk-airtime/second.webp";
import third from "@/assets/bulk-airtime/third.webp";
import fourth from "@/assets/bulk-airtime/fourth.webp";
import fifth from "@/assets/bulk-airtime/fifth.webp";
import sixth from "@/assets/bulk-airtime/sixth.webp";
import seventh from "@/assets/bulk-airtime/seventh.webp";
import eighth from "@/assets/bulk-airtime/eighth.webp";
import ninth from "@/assets/bulk-airtime/ninth.webp";
import tenth from "@/assets/bulk-airtime/tenth.webp";
import eleventh from "@/assets/bulk-airtime/eleventh.webp";
import twelfth from "@/assets/bulk-airtime/twelfth.webp";
import { BackToHome } from "@/components/layouts/back-to-home";
import { ZoomableImage } from "@/components/zoomable-image";
import { cn } from "@/lib/utils";
import { ArrowUpLeft } from "lucide-react";
import { CaseStudyNavigation } from "@/components/case-study-navigation";

export const metadata: Metadata = {
	title: "Bulk Airtime",
	alternates: { canonical: "/bulk-airtime" },
	description:
		"Designing a bulk airtime transfer feature that lets people send airtime to multiple recipients in one transaction, refined through design review feedback.",
	openGraph: {
		url: "/bulk-airtime",
		siteName: "Chibuike Maduabuchi",
		type: "article",
	},
	twitter: {
		card: "summary_large_image",
	},
};

const headingClass = "font-medium tight text-balance";
const bodyClass = "font-medium tight text-muted-foreground text-pretty";
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

export default function BulkAirtimePage() {
	return (
		<main className="page-shell case-study-page">
			<CaseStudyReveal as="nav" className="flex items-center justify-between">
				<BackToHome />
			</CaseStudyReveal>
			<CaseStudyReveal
				as="header"
				siblingIndex={1}
				className="mt-16 mb-8 md:mt-22 flex flex-col gap-3"
			>
				<h1 className="text-[1.125rem] font-semibold tight text-balance">Bulk Airtime</h1>
				<p className="text-[1rem] font-medium text-muted-foreground tight no-line-height">
					Mobile payments concept
				</p>
			</CaseStudyReveal>
			<section id="overview" tabIndex={-1} className="mb-22 flex flex-col gap-6 outline-none">
				<CaseStudyReveal as="p" siblingIndex={2} className="font-medium tight text-pretty">
					A concept for sending airtime to several people in one transaction, picked from contacts
					or typed in as a list of numbers.
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={3} className="flex flex-col gap-3">
					<h2 className={headingClass}>The problem</h2>
					<p className={bodyClass}>
						Sending airtime to a group, like friends and family on a birthday, means one transaction
						per person. Every send repeats the same steps, so a simple gift turns into a chore.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className="flex flex-col gap-3">
					<h2 className={headingClass}>My role</h2>
					<p className={bodyClass}>
						Product Designer. I designed the feature in one week and refined it through design
						review feedback.
					</p>
				</CaseStudyReveal>
			</section>
			<section id="selecting-recipients-from-contacts" tabIndex={-1} className="outline-none">
				<CaseStudyReveal className="flex flex-col gap-3">
					<h2 className={headingClass}>Selecting Recipients from Contacts</h2>
					<p className={bodyClass}>
						In this flow, users can select recipients directly from their saved contact list. By
						tapping the &quot;Select from Contacts&quot; option, they are taken to a dedicated
						screen displaying their full contact list. From there, users can select multiple
						recipients with ease. The selected contacts are then displayed as chips on the next
						screen, providing a clear visual summary for review.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal as="ul" siblingIndex={1} className="my-6 rounded-xl bg-surface-muted p-4">
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
				</CaseStudyReveal>
				<CaseStudyReveal as="p" className={cn(bodyClass, "mb-6")}>
					I used familiar interaction patterns to keep the process intuitive and quick. The
					experience focused on speed and flexibility, with features like quick selection, search,
					and bulk actions to make managing multiple recipients feel smooth and efficient.
				</CaseStudyReveal>
				<ZoomableImage
					src={first}
					width={3000}
					height={1800}
					alt="Multi-recipient transfer flow showing contact selection and a list of recipients with multiple contacts selected."
				/>
			</section>
			<section id="manually-entering-phone-numbers" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal className="flex flex-col gap-3">
					<h2 className={headingClass}>Manually Entering Phone Numbers</h2>
					<p className={bodyClass}>
						For users who prefer to enter numbers manually, this option allows them to input
						multiple phone numbers at once by separating them with commas. It&apos;s designed to
						accommodate cases where recipients are not saved in the user&apos;s contact list,
						offering greater flexibility and control over the input process.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal as="ul" siblingIndex={1} className="my-6 rounded-xl bg-surface-muted p-4">
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
				</CaseStudyReveal>
				<CaseStudyReveal as="p" className={cn(bodyClass, "mb-6")}>
					Entering several numbers at once can be tedious, so I designed the input to accept
					comma-separated entries. This keeps the process quick and gives users a clear way to
					review what they&apos;ve added before continuing.
				</CaseStudyReveal>
				<ZoomableImage
					src={second}
					width={3000}
					height={1800}
					alt="Screen for entering multiple recipient phone numbers for an airtime purchase."
				/>
			</section>
			<section id="recipient-management" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Recipient Management
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-6")}>
					I designed the screen to give users a clear overview of their transfer before they
					continue. Recipient tags make selected contacts easy to track, while separating provider,
					deal, and amount selection keeps the experience simple and easy to scan.
				</CaseStudyReveal>
				<ZoomableImage
					src={third}
					width={3000}
					height={1800}
					alt="Screen showing selected recipients and transfer details before purchase."
				/>
			</section>
			<section id="payment-review" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Payment Review
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-6")}>
					Before payment, users need a chance to verify that everything is correct. I designed the
					review screen to present all recipients, network providers, and airtime amounts in a
					clear, scannable format, making it easy to spot mistakes and make changes if needed. The
					payment sheet provides a final summary of the total amount, cashback reward, and payment
					method, giving users confidence before they complete the transaction.
				</CaseStudyReveal>
				<ZoomableImage
					src={fourth}
					width={3000}
					height={1800}
					alt="Payment review screen summarizing recipients, airtime amounts, and total cost."
				/>
			</section>
			<section id="transaction-summary-details" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Transaction Summary & Details
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-6")}>
					The flow makes it easy to review transaction results without feeling overwhelming. The
					summary screen shows the status of all completed transactions in one place, while
					individual detail screens provide more information such as the recipient, payment method,
					transaction ID, and date. This helps users quickly confirm their transactions and dig
					deeper only when they need to.
				</CaseStudyReveal>
				<ZoomableImage
					src={fifth}
					width={3000}
					height={1800}
					alt="Transaction summary and details screen for completed airtime transfers."
				/>
			</section>
			<section id="design-feedback-iterations" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Design Feedback & Iterations
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={1} className={bodyClass}>
					During design reviews, I received useful feedback that helped shape the interaction
					patterns on the Send Airtime screen. Some key insights included:
				</CaseStudyReveal>

				<CaseStudyReveal className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						The cancel (remove) button on each chip had a small tap target and was not visually
						prominent. Additionally, adding the button to all chips, including non-selected ones,
						reduced the emphasis on the highlighted chip and increased the risk of accidentally
						removing the wrong recipient.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={1} className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						Allowing users to manually select the mobile provider was flagged as unnecessary, since
						the provider can be determined automatically on the backend using the phone number.
						Leaving this step to the user introduced potential errors, such as selecting the wrong
						provider for a number or contact.
					</p>
				</CaseStudyReveal>
				<ZoomableImage
					src={sixth}
					width={3000}
					height={1800}
					alt="Iteration showing chip removal states and provider handling improvements."
				/>

				<CaseStudyReveal as="p" className={cn(bodyClass, "mt-6")}>
					I made the following improvements:
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={1} className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						The cancel button was updated with a white highlight to make it more visible and
						distinguishable. To reduce accidental removals, I removed the cancel button from all
						non-selected chips. Now, only the highlighted chip displays the cancel button, ensuring
						users can remove recipients intentionally.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						Instead of allowing users to select a mobile provider manually, the system now detects
						and displays the provider automatically based on the phone number. The provider is shown
						on the chip next to the contact or number, eliminating user error and streamlining the
						process.
					</p>
				</CaseStudyReveal>
				<ZoomableImage
					src={seventh}
					width={3000}
					height={1800}
					alt="Updated chip design showing clearer removal affordance and automatic provider labels."
				/>

				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "my-6")}>
					The designer also pointed out usability issues with the manual phone number entry flow. He
					raised concerns about what would happen if a user entered a comma too early, added it
					after an incomplete number, or forgot to include a comma altogether. Additionally, there
					was no visual feedback to indicate whether a number had been successfully recognized and
					recorded by the system.
				</CaseStudyReveal>
				<ZoomableImage
					src={eighth}
					width={3000}
					height={1800}
					alt="Manual entry flow with validation and helper messaging concepts."
				/>

				<CaseStudyReveal as="p" className={cn(bodyClass, "mt-6")}>
					I made a few key improvements based on this feedback:
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={1} className={feedbackItemClass}>
					<span className={feedbackNumberClass}>1</span>
					<p className={bodyClass}>
						To support first-time users or those unsure about the format, I added a helper icon
						beside the input field. When tapped, it opens a bottom sheet explaining how to properly
						enter multiple numbers using commas, along with examples and tips for avoiding
						formatting errors.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className={feedbackItemClass}>
					<span className={feedbackNumberClass}>2</span>
					<p className={cn(bodyClass, "mb-6")}>
						For edge cases such as entering a comma too early, forgetting it altogether, or
						inputting incomplete numbers, I implemented validation rules. The system now flags any
						number that is fewer than 11 digits, prompting users to complete or correct it.
					</p>
				</CaseStudyReveal>
				<ZoomableImage
					src={ninth}
					width={3000}
					height={1800}
					alt="Validation states for incomplete or malformed phone number input."
				/>
				<CaseStudyReveal siblingIndex={1} className={feedbackItemClass}>
					<span className={feedbackNumberClass}>3</span>
					<p className={bodyClass}>
						If a user types more than 11 digits without a comma, the system displays a warning and
						prompts them to insert the appropriate separator to avoid number merging or
						misinterpretation.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className={feedbackItemClass}>
					<span className={feedbackNumberClass}>4</span>
					<p className={cn(bodyClass, "mb-6")}>
						Each valid phone number is automatically converted into a chip once it reaches 11 digits
						and is followed by a comma. This gives users instant visual feedback that the number has
						been successfully recognized and recorded.
					</p>
				</CaseStudyReveal>
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
			<CaseStudyLink href="/medibridge" className="case-study-nav-card">
				<ArrowUpLeft className="size-6" />

				<div className="flex flex-col items-end gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Previous</p>
					<p className="text-foreground font-medium no-line-height">Medibridge</p>
				</div>
			</CaseStudyLink>
			<CaseStudyNavigation items={navItems} />
		</main>
	);
}
