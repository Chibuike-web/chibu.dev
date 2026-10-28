import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import { BackToHome } from "@/components/layouts/back-to-home";
import { LoopVideo } from "@/components/loop-video";
import { ZoomableImage } from "@/components/zoomable-image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import onboardingReview from "@/assets/medibridge/onboarding-review.webp";
import diagnosisActivity from "@/assets/medibridge/diagnosis-activity.webp";
import transferApproval from "@/assets/medibridge/transfer-approval.webp";

import { CaseStudyNavigation } from "@/components/case-study-navigation";

export const metadata: Metadata = {
	title: "Medibridge",
	alternates: { canonical: "/medibridge" },
	description:
		"How I designed and built Medibridge, a healthcare platform that turns paper, PDF, and image medical records into structured patient data and transfers them between hospitals with patient approval.",
	openGraph: {
		url: "/medibridge",
		siteName: "Chibuike Maduabuchi",
		type: "article",
	},
	twitter: {
		card: "summary_large_image",
	},
};

const headingClass = "font-medium tight text-balance";
const bodyClass = "font-medium tight text-muted-foreground text-pretty";

const navItems = [
	{
		id: "overview",
		label: "Overview",
	},
	{
		id: "patient-onboarding",
		label: "Patient Onboarding",
	},
	{
		id: "patient-management",
		label: "Patient Management",
	},
	{
		id: "patient-records-transfer",
		label: "Patient Records Transfer",
	},
];

export default function MedibridgePage() {
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
				<h1 className="text-[1.125rem] font-semibold tight text-balance">Medibridge</h1>
				<p className="text-[1rem] font-medium text-muted-foreground text-balance tight no-line-height">
					Healthcare management system
				</p>
			</CaseStudyReveal>
			<section id="overview" tabIndex={-1} className="mb-22 flex flex-col gap-6 outline-none">
				<CaseStudyReveal as="p" siblingIndex={2} className="font-medium tight text-pretty">
					Medibridge is a patient records platform for hospitals. It turns the paper, scanned, and
					photographed records hospitals already keep into structured patient profiles, gives staff
					one place to manage diagnoses, medications, allergies, labs, vitals, and encounters, and
					moves records between hospitals once the patient approves.
				</CaseStudyReveal>
				<CaseStudyReveal siblingIndex={3} className="flex flex-col gap-3">
					<h2 className={headingClass}>Why I built it</h2>
					<p className={bodyClass}>
						Picture this: a patient is rushed unconscious from a clinic in Surulere to a specialist
						hospital in Victoria Island. The only record that travels with her is a smudged,
						handwritten note in a Ghana-must-go bag. The receiving doctor has maybe ten minutes to
						decide. This happens every day.
					</p>
					<p className={bodyClass}>
						Platforms like Epic and Oracle Health assume big IT budgets and fully digital workflows,
						which many Nigerian hospitals don’t have. So I asked: what if we could transform the
						patient records hospitals already have, the PDFs, scans, and WhatsApp photos, into
						something the next doctor can search, review, and trust?
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal className="flex flex-col gap-3">
					<h2 className={headingClass}>My role</h2>
					<p className={bodyClass}>
						Design Engineer. I designed and built all of it, from the workflows to the database.
					</p>
				</CaseStudyReveal>
			</section>
			<section id="patient-onboarding" tabIndex={-1} className="outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Onboarding
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full flex mb-6 overflow-hidden rounded-xl ring ring-surface-hover isolate"
				>
					<LoopVideo
						src="/videos/patient-onboarding.mp4"
						poster="/videos/patient-onboarding.webp"
						width={800}
						height={450}
						label="Silent screen recording of patient onboarding: four patient PDFs are uploaded, the extracted details are reviewed, a wrong age is corrected, and each patient is saved."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-3")}>
					Hospitals already hold patient details in printed files, scans, and PDFs, so staff upload
					those files directly. Digital PDFs and Word files are read directly, scanned
					pages and photos go through OCR, and a language model sorts the text into the patient’s
					personal, contact, emergency, and physical details.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-6")}>
					The review screen is built around one question: can staff trust this? I built a review
					screen because the job is checking one form against one document, and staff need to see
					exactly what the model filled in. Each patient’s form is tied to
					the document it came from, one click from the original. If the document doesn’t state a
					value, the field stays empty, because a guessed date of birth looks exactly like a right
					one. If one file in a batch fails, staff retry that file alone, and
					nothing is saved until they save it.
				</CaseStudyReveal>
				<ZoomableImage
					src={onboardingReview}
					width={3000}
					height={1800}
					alt="Review Patient Information screen with editable extracted fields for one patient and the other uploaded documents waiting for review"
				/>
			</section>
			<section id="patient-management" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Management
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full flex mb-3 overflow-hidden rounded-xl ring ring-surface-hover isolate"
				>
					<LoopVideo
						src="/videos/patient-management-1.mp4"
						poster="/videos/patient-management-1.webp"
						width={800}
						height={450}
						label="Silent screen recording of a patient record: the profile overview, a 30-day blood pressure chart, diagnoses with a detail drawer, then allergies, medications, and lab results."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={2}
					className="w-full flex mb-6 overflow-hidden rounded-xl ring ring-surface-hover isolate"
				>
					<LoopVideo
						src="/videos/patient-management-2.mp4"
						poster="/videos/patient-management-2.webp"
						width={800}
						height={450}
						label="Silent screen recording of a diagnosis being edited from Stage 2 to Stage 1, its activity log showing the change, and an encounter listing the vitals and medications recorded during the visit."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-6")}>
					Each patient profile splits a growing record into sections, from vitals and diagnoses to
					medications, labs, and encounters, each with a list and a detail view. Edits save only the
					fields that changed, and every change is logged with who made it, the old value, and the
					new one. I kept that history because in a medical record, who changed a diagnosis and what
					it was before matter as much as the current value. Encounters group the
					vitals and medications recorded during a single visit.
				</CaseStudyReveal>
				<ZoomableImage
					src={diagnosisActivity}
					width={3000}
					height={1800}
					alt="Diagnosis details drawer with its activity log showing the severity stage changed from Stage 2 to Stage 1 and the updated clinical note"
				/>
			</section>

			<section id="patient-records-transfer" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Records Transfer
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full flex mb-3 overflow-hidden rounded-xl ring ring-surface-hover isolate"
				>
					<LoopVideo
						src="/videos/patient-records-transfer-request.mp4"
						poster="/videos/patient-records-transfer-request.webp"
						width={800}
						height={450}
						label="Silent screen recording of a transfer request: a patient is selected, diagnoses, allergies, medications, and labs are attached, the receiving hospital is entered, and the request is sent for patient approval."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={2}
					className="w-full flex mb-6 overflow-hidden rounded-xl ring ring-surface-hover isolate"
				>
					<LoopVideo
						src="/videos/patient-records-transfer-approval.mp4"
						poster="/videos/patient-records-transfer-approval.webp"
						width={800}
						height={450}
						label="Silent screen recording of the patient approving the transfer, the receiving hospital entering a verification code to open a read-only, expiring view of the approved records, and the request showing as completed."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-6")}>
					Records usually move between hospitals over email, printouts, and messaging apps, which
					are hard to track or verify. In Medibridge, staff choose exactly which records to send and
					where, and nothing is shared until the patient approves the request from their email. The
					receiving hospital then enters a short-lived code to open an expiring, read-only view of
					only the approved records, while the sending hospital watches the request move from
					pending to completed. The patient approves each request, because the records are theirs
					and a hospital approving its own request checks nothing. The view is read-only and
					expires, so the receiving hospital can read the records for the handover and loses access
					after it.
				</CaseStudyReveal>
				<ZoomableImage
					src={transferApproval}
					width={3000}
					height={1800}
					alt="Patient approval page listing the requesting hospital, the receiving hospital, the reason, when access ends, and every record that will be shared"
				/>
				<CaseStudyReveal as="p" className="my-16 md:my-22">
					Medibridge is in active development. Follow along in the{" "}
					<a
						className="link rounded border border-transparent"
						href="https://github.com/Chibuike-web/medibridge"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub repository
					</a>
					.
				</CaseStudyReveal>
			</section>
			<CaseStudyLink href="/bulk-airtime" className="case-study-nav-card">
				<div className="flex flex-col gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Next</p>
					<p className="text-foreground font-medium no-line-height">Bulk Airtime</p>
				</div>
				<ArrowUpRight className="size-6" />
			</CaseStudyLink>
			<CaseStudyNavigation items={navItems} />
		</main>
	);
}
