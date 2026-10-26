import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import { BackToHome } from "@/components/layouts/back-to-home";
import { ZoomableImageGroup } from "@/components/zoomable-image-group";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import patientOnboardingFirst from "@/assets/medibridge/patient-onboarding-first.webp";
import patientOnboardingSecond from "@/assets/medibridge/patient-onboarding-second.webp";
import patientOnboardingThird from "@/assets/medibridge/patient-onboarding-third.webp";
import patientOnboardingFourth from "@/assets/medibridge/patient-onboarding-fourth.webp";
import patientOnboardingFifth from "@/assets/medibridge/patient-onboarding-fifth.webp";
import patientOnboardingSixth from "@/assets/medibridge/patient-onboarding-sixth.webp";
import patientOnboardingSeventh from "@/assets/medibridge/patient-onboarding-seventh.webp";
import patientManagementFirst from "@/assets/medibridge/patient-management-first.webp";
import patientManagementSecond from "@/assets/medibridge/patient-management-second.webp";
import patientManagementThird from "@/assets/medibridge/patient-management-third.webp";
import patientManagementFourth from "@/assets/medibridge/patient-management-fourth.webp";
import patientManagementFifth from "@/assets/medibridge/patient-management-fifth.webp";
import patientManagementSixth from "@/assets/medibridge/patient-management-sixth.webp";
import patientManagementSeventh from "@/assets/medibridge/patient-management-seventh.webp";
import patientManagementEighth from "@/assets/medibridge/patient-management-eighth.webp";
import patientManagementNinth from "@/assets/medibridge/patient-management-ninth.webp";
import patientManagementTenth from "@/assets/medibridge/patient-management-tenth.webp";
import patientManagementEleventh from "@/assets/medibridge/patient-management-eleventh.webp";
import patientManagementTwelfth from "@/assets/medibridge/patient-management-twelfth.webp";
import patientManagementThirteenth from "@/assets/medibridge/patient-management-thirteenth.webp";
import patientManagementFourteenth from "@/assets/medibridge/patient-management-fourteenth.webp";
import patientManagementFifteenth from "@/assets/medibridge/patient-management-fifteenth.webp";
import patientRecordsTransferFirst from "@/assets/medibridge/patient-records-transfer-first.webp";
import patientRecordsTransferSecond from "@/assets/medibridge/patient-records-transfer-second.webp";
import patientRecordsTransferThird from "@/assets/medibridge/patient-records-transfer-third.webp";
import patientRecordsTransferFourth from "@/assets/medibridge/patient-records-transfer-fourth.webp";
import patientRecordsTransferFifth from "@/assets/medibridge/patient-records-transfer-fifth.webp";
import patientRecordsTransferSixth from "@/assets/medibridge/patient-records-transfer-sixth.webp";
import patientRecordsTransferSeventh from "@/assets/medibridge/patient-records-transfer-seventh.webp";
import patientRecordsTransferEighth from "@/assets/medibridge/patient-records-transfer-eighth.webp";
import patientRecordsTransferNinth from "@/assets/medibridge/patient-records-transfer-ninth.webp";
import patientRecordsTransferTenth from "@/assets/medibridge/patient-records-transfer-tenth.webp";
import patientRecordsTransferEleventh from "@/assets/medibridge/patient-records-transfer-eleventh.webp";

import { CaseStudyNavigation } from "@/components/case-study-navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

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
		src: patientOnboardingFirst,
		alt: "Overview page empty state with no patients yet and an Add patient button",
	},
	{
		src: patientOnboardingSecond,
		alt: "Upload Patient’s Record screen with a drop zone for JPEG, PNG, and PDF files",
	},
	{
		src: patientOnboardingThird,
		alt: "Seven patient PDFs uploaded while patient data is being extracted",
	},
	{
		src: patientOnboardingFourth,
		alt: "Confirm document selection dialog warning that files cannot be added once extraction starts",
	},
	{
		src: patientOnboardingFifth,
		alt: "All seven uploaded PDFs marked as extraction complete, with a Continue button",
	},
	{
		src: patientOnboardingSixth,
		alt: "Review Patient Information list of seven extracted patients above a Save Patient Record button",
	},
	{
		src: patientOnboardingSeventh,
		alt: "Expanded patient review card with editable extracted personal and contact fields",
	},
];
const patientManagementImages = [
	{
		src: patientManagementFirst,
		alt: "Patients page empty state with no patient records and an Add patient button",
	},
	{
		src: patientManagementSecond,
		alt: "Patient overview with personal and medical information and a table of recent diagnoses",
	},
	{
		src: patientManagementThird,
		alt: "Patients table filtered by gender, age, and date, with a row menu to view, transfer, export, or archive a patient",
	},
	{
		src: patientManagementFourth,
		alt: "Edit Contact Information dialog with required phone, email, address, state, and country fields",
	},
	{
		src: patientManagementFifth,
		alt: "Diagnoses table with onset, last reviewed, and status columns, and a row menu open",
	},
	{
		src: patientManagementSixth,
		alt: "Allergies table with reactions and severity, filtered by status, with a row menu open",
	},
	{
		src: patientManagementSeventh,
		alt: "Lab tests table with reference ranges and flags, with three tests selected for bulk export or archive",
	},
	{
		src: patientManagementEighth,
		alt: "Vitals page with a 30-day blood pressure trend chart above the vitals table",
	},
	{
		src: patientManagementNinth,
		alt: "Encounters table listing visit type, department, and physician, with a row menu open",
	},
	{
		src: patientManagementTenth,
		alt: "Encounter details showing the vitals and medications recorded during the visit",
	},
	{
		src: patientManagementEleventh,
		alt: "Immunization details panel for a hepatitis B dose, with its edit history",
	},
	{
		src: patientManagementTwelfth,
		alt: "Add medication form with required fields for medication, indication, dose, route, and frequency",
	},
	{
		src: patientManagementThirteenth,
		alt: "Edit document details panel for a chest X-ray report, confirming removal of an attached file",
	},
	{
		src: patientManagementFourteenth,
		alt: "Edit procedure details panel for an appendectomy, linked to a related diagnosis and medication",
	},
	{
		src: patientManagementFifteenth,
		alt: "Create encounter panel listing record types to add, from vitals and medications to lab tests and documents",
	},
];
const patientRecordsTransferImages = [
	{
		src: patientRecordsTransferFirst,
		alt: "Transfers page empty state with no transfers yet and a Create transfer request button",
	},
	{
		src: patientRecordsTransferSecond,
		alt: "New transfer request, step 1 of 2, with a searchable patient picker",
	},
	{
		src: patientRecordsTransferThird,
		alt: "Step 1 of 2 with four patients selected for transfer",
	},
	{
		src: patientRecordsTransferFourth,
		alt: "Step 2 of 2 for attaching clinical records by type and entering the target hospital’s name and email",
	},
	{
		src: patientRecordsTransferFifth,
		alt: "Diagnosis picker for choosing which records to attach to the transfer",
	},
	{
		src: patientRecordsTransferSixth,
		alt: "Completed step 2 of 2 with eight records attached and Enugu State Teaching Hospital as the destination",
	},
	{
		src: patientRecordsTransferSeventh,
		alt: "Confirm Transfer Request dialog with a review checklist before sending for patient approval",
	},
	{
		src: patientRecordsTransferEighth,
		alt: "Transfer Request Sent confirmation explaining that the patient approves before records reach the hospital",
	},
	{
		src: patientRecordsTransferNinth,
		alt: "Receiving hospital’s read-only view of shared diagnoses, with a banner showing when access expires",
	},
	{
		src: patientRecordsTransferTenth,
		alt: "Read-only shared medications view with an access expiring soon warning",
	},
	{
		src: patientRecordsTransferEleventh,
		alt: "Transfers table showing each request’s target hospital and status, from pending to completed or rejected",
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
				<ThemeSwitcher />
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
					<p className={bodyClass}>Product Engineer. I design and build Medibridge end to end.</p>
				</CaseStudyReveal>
			</section>
			<section id="patient-onboarding" tabIndex={-1} className="outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Onboarding
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mb-6 bg-black overflow-hidden"
				>
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						poster="/videos/patient-onboarding.webp"
						aria-label="Silent screen recording of the patient onboarding flow, showing a document being uploaded and the extracted fields being reviewed and corrected before the patient is confirmed."
					>
						<source src="/videos/patient-onboarding.mp4" type="video/mp4" />
					</video>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-6")}>
					Re-typing patient details from printed files, scans, and PDFs is slow, so the upload reads
					the text for staff. Digital PDFs and Word files are read directly, and scanned pages and
					photos go through OCR. A language model then sorts that text into the patient’s personal,
					contact, emergency, and physical details. Nothing is saved automatically. Staff review and
					edit every field before confirming the patient.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientOnboardingImages} width={3000} height={1800} />
			</section>
			<section id="patient-management" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Management
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mb-3 bg-black overflow-hidden"
				>
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						poster="/videos/patient-management-1.webp"
						aria-label="Silent screen recording of patient management, showing clinical sections in list and detail views as a record is browsed."
					>
						<source src="/videos/patient-management-1.mp4" type="video/mp4" />
					</video>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={2}
					className="w-full rounded-2xl flex mb-6 bg-black overflow-hidden"
				>
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						poster="/videos/patient-management-2.webp"
						aria-label="Silent screen recording of patient management, showing history views and the source documents that remain attached to a record."
					>
						<source src="/videos/patient-management-2.mp4" type="video/mp4" />
					</video>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={3} className={cn(bodyClass, "mb-6")}>
					Each patient profile groups medications, allergies, diagnoses, procedures, immunizations,
					lab results, and history into their own sections. List and detail views keep a growing
					record easy to scan, history views show how details change, and the original documents
					stay attached for context.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientManagementImages} width={3000} height={1800} />
			</section>

			<section id="patient-records-transfer" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Records Transfer
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mb-6 bg-black overflow-hidden"
				>
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						poster="/videos/patient-records-transfer.webp"
						aria-label="Silent screen recording of the records transfer flow, showing a request being created, the patient approving it by email, and the recipient verifying a code to open a read-only view."
					>
						<source src="/videos/patient-records-transfer.mp4" type="video/mp4" />
					</video>
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={2} className={cn(bodyClass, "mb-6")}>
					Transfers usually happen over email, printouts, and messaging apps, which are hard to
					track or verify. In Medibridge, staff build a transfer from verified records, and the
					patient approves it by email before anything is shared. The receiving hospital verifies a
					short-lived code to open an expiring, read-only view, and statuses show whether each
					request is pending, approved, declined, or completed.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientRecordsTransferImages} width={3000} height={1800} />
				<CaseStudyReveal as="p" className="my-16 md:my-22">
					Medibridge is in active development. Follow along in the{" "}
					<a
						className="link rounded border border-transparent focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
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
