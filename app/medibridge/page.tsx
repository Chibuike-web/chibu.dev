import type { Metadata } from "next";
import { CaseStudyLink, CaseStudyReveal } from "@/components/case-study-reveal";
import { Tag } from "@/components/tag";
import { BackToHome } from "@/components/layouts/back-to-home";
import { ZoomableImageGroup } from "@/components/zoomable-image-group";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { cookies } from "next/headers";
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

import ProgressBar from "@/components/progress-bar";
import { Suspense } from "react";
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

const headingClass = "text-[1.125rem] font-medium tight text-balance";
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
			<CaseStudyReveal as="header" siblingIndex={1} className="my-16 md:my-22">
				<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col gap-3">
						<h1 className="text-[1.125rem] font-semibold tight text-balance">Medibridge</h1>
						<div className="flex items-center gap-1.5">
							<p className="text-[1rem] font-medium text-muted-foreground text-balance tight no-line-height">
								Healthcare management system
							</p>
							<span className="size-0.5 rounded-full bg-muted-foreground flex shrink-0" />
							<p className="text-[1rem] font-medium text-muted-foreground tight no-line-height">
								2025
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<Tag key={tag.label} label={tag.label} color={tag.color} bgColor={tag.bgColor} />
						))}
					</div>
				</div>
			</CaseStudyReveal>
			<section id="overview" tabIndex={-1} className="my-22 outline-none">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8">
					<CaseStudyReveal siblingIndex={2} className="flex w-full flex-col gap-2">
						<p className="font-semibold text-foreground">PROBLEM STATEMENT</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							Medical records are still commonly stored as paper files, scanned documents, PDFs, or
							images. This makes it difficult for hospitals and clinics to quickly access, organize,
							and transfer accurate patient information, especially during inter-facility transfers.
							Healthcare staff often spend time manually reviewing documents, extracting
							information, and handling fragmented records across different systems. The lack of
							structured and interoperable medical data slows down workflows and affects continuity
							of care.
						</p>
					</CaseStudyReveal>
					<CaseStudyReveal siblingIndex={3} className="flex w-full flex-col gap-2">
						<p className="font-semibold text-foreground">OBJECTIVE</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							Design a platform that helps hospitals and clinics digitize medical records, extract
							structured patient information from unstructured files, and streamline patient record
							transfers between healthcare facilities. The goal is to reduce administrative
							workload, improve accessibility of patient records, and create a faster and more
							reliable transfer process with review and patient approval workflows.
						</p>
					</CaseStudyReveal>
					<CaseStudyReveal className="flex w-full flex-col gap-2">
						<p className="font-semibold text-foreground">SOLUTION OVERVIEW</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							Medibridge is an AI-powered healthcare platform designed to convert physical and
							unstructured medical records into structured digital patient data. The platform allows
							healthcare staff to upload scanned documents, PDFs, and images, automatically extract
							patient information using AI, review the extracted data, and manage patient records
							transfers between hospitals through a centralized workflow. The system also includes
							transfer approval flows, record sharing, and structured patient profiles to improve
							record management and continuity of care.
						</p>
					</CaseStudyReveal>
					<div className="grid gap-6 sm:grid-cols-2">
						<CaseStudyReveal className="flex w-full flex-col gap-2">
							<p className="font-semibold text-foreground">ROLE</p>
							<p className="font-medium text-muted-foreground tight">Product Engineer</p>
						</CaseStudyReveal>
						<CaseStudyReveal siblingIndex={1} className="flex w-full flex-col gap-2">
							<p className="font-semibold text-foreground">DURATION</p>
							<p className="font-medium text-muted-foreground tight">Ongoing</p>
						</CaseStudyReveal>
					</div>
				</div>
				<CaseStudyReveal className="mt-22 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
					<p>
						Picture this: a patient is rushed from a clinic in Surulere to a specialist hospital in
						Victoria Island. She’s unconscious. Her family does not know her medication history. The
						only record that travels with her is a folded piece of paper, handwritten and partially
						smudged, tucked inside a Ghana-must-go bag. The receiving doctor has maybe ten minutes
						to make decisions that matter. She’s starting with almost nothing. This is not
						hypothetical. This happens every day.
					</p>
					<p>
						I started paying closer attention to how patient records move between hospitals. Files
						stacked in cardboard boxes. Discharge summaries photographed on someone’s Tecno phone
						and sent over WhatsApp. Lab results saved as scanned images that doctors have to zoom
						into just to read clearly.
					</p>
					<p>
						I looked at platforms like Epic Systems and Oracle Health. They are powerful systems,
						but they were built for hospitals with strong IT infrastructure, large budgets, and
						fully digital workflows already in place. That is not the reality for many hospitals in
						Nigeria. Even then, a lot of medical data still has to be typed in manually. The
						challenge is not just storing records. It is the amount of human effort needed to
						organize them in the first place.
					</p>
					<p>
						That is where Medibridge begins. With a simple question: what if we worked with the
						records hospitals already have? The PDFs. The scanned handwritten notes. The
						photographed lab results. The discharge summaries written in different formats across
						different clinics. What if AI could read those records, understand them, and turn them
						into something doctors can quickly search, review, and transfer? Medibridge is designed
						to fit into the way hospitals already work instead of asking them to start over. The
						goal is simple: help the next doctor see the full picture before making critical
						decisions. Because somewhere right now, a doctor is treating a patient without the
						information they need. That gap can be closed.
					</p>
				</CaseStudyReveal>
			</section>
			<section id="patient-onboarding" tabIndex={-1} className="outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Onboarding
				</CaseStudyReveal>
				<CaseStudyReveal as="p" siblingIndex={1} className={cn(bodyClass, "mb-6")}>
					One of the first problems I tried to solve was reducing the amount of manual work involved
					in adding patients into the system. Many hospitals already have patient information stored
					as printed documents, scanned files, PDFs, or images. Re-entering this information
					manually can be repetitive and time-consuming, especially when handling large numbers of
					records. I wanted the onboarding process to feel faster and more structured, so I built an
					AI-assisted flow that allows healthcare staff to upload existing medical documents and
					extract patient’s personal information automatically. The flow supports different file
					formats and guides staff through reviewing extracted information before saving it into the
					patient profile.
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientOnboardingImages} width={3000} height={1800} />

				<CaseStudyReveal className="mt-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
					<p>
						Patient onboarding is often the first interaction hospital staff have with a new record,
						so the experience needed to feel simple and reliable. I limited the initial extraction
						to essential information such as the patient’s name, age, gender, contact details, and
						identifiers. Keeping the scope focused makes the results easier to review and reduces
						the risk of incorrect information entering the patient’s history.
					</p>
					<p>
						AI-extracted information is never saved automatically. Every field remains editable,
						allowing staff to correct errors and complete missing details before confirming the
						patient. The upload flow also supports the document formats hospitals already use,
						including PDFs, scanned files, images, and Word documents, so it can fit into existing
						workflows without requiring hospitals to change how their records are prepared.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden"
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
			</section>
			<section id="patient-management" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Management
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="mt-3 text-muted-foreground font-medium text-pretty flex flex-col gap-2 mb-6"
				>
					<p>
						After onboarding patients into the system, I designed the day-to-day experience of
						managing patient records inside the hospital workflow. Medical information changes
						frequently during treatment, so the interface needed to support quick updates while
						keeping records easy to review during consultations, admissions, transfers, and
						follow-up care.
					</p>
					<p>
						Healthcare staff can manage patient information directly from a centralized patient
						profile with dedicated sections for medications, allergies, diagnoses, procedures,
						immunizations, laboratory results, and medical history. Grouping information into
						sections helps staff quickly locate relevant details, review patient history, and update
						records without moving through multiple pages or relying heavily on uploaded documents.
					</p>
					<p>
						I also designed the system to support ongoing updates as patient care continues. New
						medications can be added, diagnoses reviewed, allergies updated, and laboratory results
						recorded directly within the patient profile. Uploaded files and attachments remain
						available when needed, while extracted and manually entered information becomes easier
						to maintain as part of the patient record over time.
					</p>
					<p>
						The goal was to create a record management experience that feels practical during real
						hospital workflows where information needs to be reviewed quickly, updated regularly,
						and carried across different stages of patient care.
					</p>
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientManagementImages} width={3000} height={1800} />
				<CaseStudyReveal className="mt-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
					<p>
						Once the information was divided into clinical sections, the next challenge was keeping
						a growing patient record easy to navigate. Each area uses list and detail views,
						allowing staff to scan existing records before opening a specific entry for more
						information. Several record types also include history views, making it easier to
						understand how individual details have changed over time.
					</p>
					<p>
						Source documents and attachments remain available when additional context is needed, but
						staff do not have to search through every file during routine care. Confirmed patient
						information is presented in a form that is easier to review, while the original
						documents remain connected to the record. This creates a balance between quick access
						and the supporting information behind each patient’s history.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden"
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
				<CaseStudyReveal className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden">
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
			</section>

			<section id="patient-records-transfer" tabIndex={-1} className="mt-22 outline-none">
				<CaseStudyReveal as="h2" className={cn(headingClass, "mb-3")}>
					Patient Records Transfer
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="mt-3 mb-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2"
				>
					<p>
						Another area I focused on was improving how patient records are transferred between
						hospitals. Transfers often rely on email, printed documents, messaging apps, or other
						disconnected channels, making records difficult to track, review, and verify. Medibridge
						brings this process into a structured workflow that begins from an existing patient
						profile.
					</p>
					<p>
						Healthcare staff can prepare a transfer using verified records and provide any necessary
						context before sending it for patient approval. Once approved, the selected records are
						made available to the receiving hospital through a secure, time-limited, read-only link
						instead of sending raw files through disconnected channels.
					</p>
				</CaseStudyReveal>
				<ZoomableImageGroup images={patientRecordsTransferImages} width={3000} height={1800} />
				<CaseStudyReveal className="text-muted-foreground font-medium text-pretty flex flex-col gap-2 mt-6">
					<p>
						The most important part of the transfer experience was keeping the patient involved. A
						hospital cannot release the selected records immediately after creating a request. The
						patient first receives an email containing a secure approval link, where they can review
						the receiving hospital, the requested records, and the transfer details before approving
						or declining.
					</p>
					<p>
						Approval does not give the receiving hospital permanent access to the patient’s full
						history. The recipient must verify a short-lived code before opening an expiring,
						read-only view limited to the approved records. Transfer statuses also help the
						initiating hospital see whether a request is pending, approved, declined, or completed.
					</p>
				</CaseStudyReveal>
				<CaseStudyReveal
					siblingIndex={1}
					className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden"
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
			<CaseStudyLink href="/nomba" className="case-study-nav-card">
				<div className="flex flex-col gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Next</p>
					<p className="text-foreground font-medium no-line-height">Nomba</p>
				</div>
				<ArrowUpRight className="size-6" />
			</CaseStudyLink>
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
		label: "Dev",
		color: "var(--red)",
		bgColor: "var(--red-muted)",
	},
	{
		label: "Web App",
		color: "var(--green)",
		bgColor: "var(--green-muted)",
	},
];

async function Progress() {
	const cookieStore = await cookies();
	const stored = cookieStore.get("isExpandedValue")?.value;
	return <ProgressBar items={navItems} initialState={stored} />;
}
