import { Tag } from "@/components/tag";
import { BackToHome } from "@/components/layouts/back-to-home";
import { ZoomableImageGroup } from "@/components/zoomable-image-group";
import { cn } from "@/lib/utils";
import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
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
import { ThemeButton } from "@/components/theme-button";

const headingClass = "text-[1.125rem] font-medium tight text-balance";
const bodyClass = "font-medium tight text-muted-foreground text-pretty";
const patientOnboardingGridImages = [
	patientOnboardingSecond,
	patientOnboardingThird,
	patientOnboardingFourth,
	patientOnboardingFifth,
	patientOnboardingSixth,
	patientOnboardingSeventh,
];
const patientManagementGridImages = [
	patientManagementSecond,
	patientManagementThird,
	patientManagementFourth,
	patientManagementFifth,
	patientManagementSixth,
	patientManagementSeventh,
	patientManagementEighth,
	patientManagementNinth,
	patientManagementTenth,
	patientManagementEleventh,
	patientManagementTwelfth,
	patientManagementThirteenth,
	patientManagementFourteenth,
	patientManagementFifteenth,
];
const patientRecordsTransferGridImages = [
	patientRecordsTransferSecond,
	patientRecordsTransferThird,
	patientRecordsTransferFourth,
	patientRecordsTransferFifth,
	patientRecordsTransferSixth,
	patientRecordsTransferSeventh,
	patientRecordsTransferEighth,
	patientRecordsTransferNinth,
	patientRecordsTransferTenth,
	patientRecordsTransferEleventh,
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
		<main className="page-shell">
			<nav className="mount-1 flex items-center justify-between">
				<BackToHome />
				<ThemeButton />
			</nav>
			<header className="mount-2 my-16 md:my-22">
				<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col gap-3">
						<h1 className="text-[1.125rem] font-semibold tight text-balance">Medibridge</h1>
						<div className="flex items-center gap-1.5">
							<p className="text-[1rem] font-medium text-muted-foreground text-balance tight no-line-height">
								AI-powered healthcare management system
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
			</header>
			<section id="overview" tabIndex={-1} className="mount-3 my-22 outline-none">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-8">
					<div className="flex w-full flex-col gap-2">
						<p className="font-secondary font-semibold text-foreground">PROBLEM STATEMENT</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							Medical records are still commonly stored as paper files, scanned documents, PDFs, or
							images. This makes it difficult for hospitals and clinics to quickly access, organize,
							and transfer accurate patient information, especially during inter-facility transfers.
							Healthcare staff often spend time manually reviewing documents, extracting
							information, and handling fragmented records across different systems. The lack of
							structured and interoperable medical data slows down workflows and affects continuity
							of care.
						</p>
					</div>
					<div className="flex w-full flex-col gap-2">
						<p className="font-secondary font-semibold text-foreground">OBJECTIVE</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							Design a platform that helps hospitals and clinics digitize medical records, extract
							structured patient information from unstructured files, and streamline patient record
							transfers between healthcare facilities. The goal is to reduce administrative
							workload, improve accessibility of patient records, and create a faster and more
							reliable transfer process with review and patient approval workflows.ople.
						</p>
					</div>
					<div className="flex w-full flex-col gap-2">
						<p className="font-secondary font-semibold text-foreground">SOLUTION OVERVIEW</p>
						<p className="font-medium text-muted-foreground tight text-pretty">
							MediBridge is an AI-powered healthcare platform designed to convert physical and
							unstructured medical records into structured digital patient data. The platform allows
							healthcare staff to upload scanned documents, PDFs, and images, automatically extract
							patient information using AI, review the extracted data, and manage patient records
							transfers between hospitals through a centralized workflow. The system also includes
							transfer approval flows, record sharing, and structured patient profiles to improve
							record management and continuity of care.
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2">
						<div className="flex w-full flex-col gap-2">
							<p className="font-secondary font-semibold text-foreground">ROLE</p>
							<div>
								<p className="font-medium text-muted-foreground tight">Product Designer</p>
								<p className="font-medium text-muted-foreground tight">Product Manager</p>
								<p className="font-medium text-muted-foreground tight">Product Engineer</p>
							</div>
						</div>
						<div className="flex w-full flex-col gap-2">
							<p className="font-secondary font-semibold text-foreground">DURATION</p>
							<p className="font-medium text-muted-foreground tight">Ongoing</p>
						</div>
					</div>
				</div>
				<div className="mt-22 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
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
						That is where MediBridge begins. With a simple question: what if we worked with the
						records hospitals already have? The PDFs. The scanned handwritten notes. The
						photographed lab results. The discharge summaries written in different formats across
						different clinics. What if AI could read those records, understand them, and turn them
						into something doctors can quickly search, review, and transfer? MediBridge is designed
						to fit into the way hospitals already work instead of asking them to start over. The
						goal is simple: help the next doctor see the full picture before making critical
						decisions. Because somewhere right now, a doctor is treating a patient without the
						information they need. That gap can be closed.
					</p>
				</div>
			</section>
			<section id="patient-onboarding" tabIndex={-1} className="outline-none">
				<h2 className={cn(headingClass, "mb-3")}>Patient Onboarding</h2>
				<p className={cn(bodyClass, "mb-6")}>
					One of the first problems I tried to solve was reducing the amount of manual work involved
					in adding patients into the system. Many hospitals already have patient information stored
					as printed documents, scanned files, PDFs, or images. Re-entering this information
					manually can be repetitive and time-consuming, especially when handling large numbers of
					records. I wanted the onboarding process to feel faster and more structured, so I built an
					AI-assisted flow that allows healthcare staff to upload existing medical documents and
					extract patient’s personal information automatically. The flow supports different file
					formats and guides staff through reviewing extracted information before saving it into the
					patient profile.
				</p>
				<ZoomableImageGroup
					images={[patientOnboardingFirst, ...patientOnboardingGridImages]}
					width={3000}
					height={1800}
					alt=""
				/>

				<div className="mt-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
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
				</div>
				<div className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden">
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						aria-label="Silent screen recording of the patient onboarding flow, showing a document being uploaded and the extracted fields being reviewed and corrected before the patient is confirmed."
					>
						<source src="/videos/patient-onboarding.mp4" type="video/mp4" />
					</video>
				</div>
			</section>
			<section id="patient-management" tabIndex={-1} className="mt-22 outline-none">
				<h2 className={cn(headingClass, "mb-3")}>Patient Management</h2>
				<div className="mt-3 text-muted-foreground font-medium text-pretty flex flex-col gap-2 mb-6">
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
				</div>
				<ZoomableImageGroup
					images={[patientManagementFirst, ...patientManagementGridImages]}
					width={3000}
					height={1800}
					alt=""
				/>
				<div className="mt-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
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
				</div>
				<div className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden">
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						aria-label="Silent screen recording of patient management, showing clinical sections in list and detail views as a record is browsed."
					>
						<source src="/videos/patient-management-1.mp4" type="video/mp4" />
					</video>
				</div>
				<div className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden">
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						aria-label="Silent screen recording of patient management, showing history views and the source documents that remain attached to a record."
					>
						<source src="/videos/patient-management-2.mp4" type="video/mp4" />
					</video>
				</div>
			</section>

			<section id="patient-records-transfer" tabIndex={-1} className="mt-22 outline-none">
				<h2 className={cn(headingClass, "mb-3")}>Patient Records Transfer</h2>
				<div className="mt-3 mb-6 text-muted-foreground font-medium text-pretty flex flex-col gap-2">
					<p>
						Another area I focused on was improving how patient records are transferred between
						hospitals. Transfers often rely on email, printed documents, messaging apps, or other
						disconnected channels, making records difficult to track, review, and verify. MediBridge
						brings this process into a structured workflow that begins from an existing patient
						profile.
					</p>
					<p>
						Healthcare staff can prepare a transfer using verified records and provide any necessary
						context before sending it for patient approval. Once approved, the selected records are
						made available to the receiving hospital through a secure, time-limited, read-only link
						instead of sending raw files through disconnected channels.
					</p>
				</div>
				<ZoomableImageGroup
					images={[patientRecordsTransferFirst, ...patientRecordsTransferGridImages]}
					width={3000}
					height={1800}
					alt=""
				/>
				<div className="text-muted-foreground font-medium text-pretty flex flex-col gap-2 mt-6">
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
				</div>
				<div className="w-full rounded-2xl flex mt-6 bg-black overflow-hidden">
					<video
						controls
						muted
						preload="metadata"
						width={800}
						height={450}
						aria-label="Silent screen recording of the records transfer flow, showing a request being created, the patient approving it by email, and the recipient verifying a code to open a read-only view."
					>
						<source src="/videos/patient-records-transfer.mp4" type="video/mp4" />
					</video>
				</div>
				<p className="my-16 md:my-22">
					This project is currently in active development. You can follow along here{" "}
					<a
						className="link rounded border border-transparent focus-visible:border-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring"
						href="https://github.com/Chibuike-web/medibridge"
						target="_blank"
						rel="noopener noreferrer"
					>
						Medibridge
					</a>
					. More update will be made going forward
				</p>
			</section>
			<Link href="/nomba" prefetch={true} className="case-study-nav-card">
				<ArrowUpLeft className="size-6" />

				<div className="flex flex-col items-end gap-3">
					<p className="text-muted-foreground font-medium no-line-height">Previous</p>
					<p className="text-foreground font-medium no-line-height">Nomba</p>
				</div>
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
