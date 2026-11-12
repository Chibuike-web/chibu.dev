import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import { BackToHome } from "@/components/layouts/back-to-home";
import { LoopVideo } from "@/components/loop-video";
import { ZoomableImageGroup } from "@/components/zoomable-image-group";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import onboardingReview from "@/assets/medibridge/onboarding-review.webp";
import onboardingAddPatient from "@/assets/medibridge/onboarding-add-patient.webp";
import onboardingUpload from "@/assets/medibridge/onboarding-upload.webp";
import onboardingExtracting from "@/assets/medibridge/onboarding-extracting.webp";
import diagnosisActivity from "@/assets/medibridge/diagnosis-activity.webp";
import managementVitals from "@/assets/medibridge/management-vitals.webp";
import managementDiagnoses from "@/assets/medibridge/management-diagnoses.webp";
import managementMedications from "@/assets/medibridge/management-medications.webp";
import transferApproval from "@/assets/medibridge/transfer-approval.webp";
import transferRecordPicker from "@/assets/medibridge/transfer-record-picker.webp";
import transferConfirm from "@/assets/medibridge/transfer-confirm.webp";
import transferSharedDiagnoses from "@/assets/medibridge/transfer-shared-diagnoses.webp";

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
const patientOnboardingImages = [
	{
		src: onboardingAddPatient,
		alt: "Add patient dialog with the bulk upload option selected over manual entry",
	},
	{
		src: onboardingUpload,
		alt: "Upload screen listing four patient record PDFs ready for extraction",
	},
	{
		src: onboardingExtracting,
		alt: "Upload screen showing each of the four PDFs being extracted",
	},
	{
		src: onboardingReview,
		alt: "Review Patient Information screen with editable extracted fields for one patient and the other uploaded documents waiting for review",
	},
];
const patientManagementImages = [
	{
		src: managementVitals,
		alt: "Vitals tab with a 30-day blood pressure chart above the table of recorded vitals",
	},
	{
		src: managementDiagnoses,
		alt: "Diagnoses tab listing five diagnoses with their dates and statuses",
	},
	{
		src: diagnosisActivity,
		alt: "Diagnosis details drawer with its activity log showing the severity stage changed from Stage 2 to Stage 1 and the updated clinical note",
	},
	{
		src: managementMedications,
		alt: "Medications tab listing each medication with its dose, route, indication, and status",
	},
];
const patientRecordsTransferImages = [
	{
		src: transferRecordPicker,
		alt: "New Transfer Request form with two diagnoses selected in the clinical records picker",
	},
	{
		src: transferConfirm,
		alt: "Confirm Transfer Request dialog with a checklist and a Send for Approval button",
	},
	{
		src: transferApproval,
		alt: "Patient approval page listing the requesting hospital, the receiving hospital, the reason, when access ends, and every record that will be shared",
	},
	{
		src: transferSharedDiagnoses,
		alt: "Read-only shared diagnoses showing only the two records the patient approved",
	},
];

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
				<h1 id="overview" className="text-[1.125rem] font-semibold tight text-balance">Medibridge</h1>
				<p className="text-[1rem] font-medium text-muted-foreground text-balance tight no-line-height">
					Healthcare management system
				</p>
			</CaseStudyReveal>
			<section className="mb-22 flex flex-col gap-6">
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
						Design Engineer. I designed and built it, from ideation to implementation.
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
					Staff upload the patient documents the hospital already has, including printed forms,
					scanned records, photos, and digital PDFs and Word files. Medibridge extracts text
					directly from digital documents and uses OCR for scans and photos. A language model then
					organises the extracted information into structured patient details, covering personal
					information, contact details, emergency contacts, and physical details.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-6")}>
					Nothing is saved automatically. Staff review the extracted information one patient at a
					time, with access to the original source document just one click away. Fields missing
					from the source are left empty for staff to complete. When processing a batch, a failed
					file can be retried independently without affecting the others.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientOnboardingImages} width={3000} height={1800} />
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
						label="Silent screen recording of a patient record: the profile overview, a 30-day blood pressure chart, diagnoses filtered to resolved and cleared, a diagnosis detail drawer, then allergies, medications, and lab results."
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
						label="Silent screen recording of a diagnosis selected in the table and opened from the selection bar, edited from Stage 2 to Stage 1, its activity log showing the change, and an encounter listing the vitals and medications recorded during the visit."
					/>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-3")}>
					Each patient profile organises medical information into dedicated sections, including
					vitals, diagnoses, medications, labs, and encounters. Staff can browse each section
					through a list and open individual records for more detail.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={4} className={cn(bodyClass, "mb-6")}>
					Changes are saved at the field level, so only the information that has been edited is
					updated. Every change is recorded in an audit log, including who made it and the values
					before and after the edit. Encounters bring together the vitals, medications, and other
					clinical information recorded during a patient’s visit.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientManagementImages} width={3000} height={1800} />
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
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-3")}>
					Patient records often move between hospitals through email, printed documents, and
					messaging apps, making it difficult to track what has been shared and when.
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={4} className={cn(bodyClass, "mb-6")}>
					Medibridge provides a structured transfer process. Staff select the patient’s records and
					the receiving hospital, then send a request for patient approval. No records are shared
					until the patient approves the request through their email. Once approved, the receiving
					hospital uses a short-lived access code to open a read-only view of the authorised
					records. Access expires after the handover, while the sending hospital can track the
					request from pending to completed.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientRecordsTransferImages} width={3000} height={1800} />
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
			<CaseStudyLink href="/knowledge-ci" className="case-study-nav-card">
				<div className="flex flex-col gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Next</p>
					<p className="text-foreground font-medium no-line-height">Knowledge CI</p>
				</div>
				<ArrowUpRight className="size-6" />
			</CaseStudyLink>
			<CaseStudyNavigation items={navItems} />
		</main>
	);
}
