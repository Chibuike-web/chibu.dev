const markdown = `---
title: Orta
description: How I built Orta, a platform for digitising patient records and transferring them between hospitals with patient approval.
canonical: https://chibu.dev/orta
last_updated: 2026-11-20
---

# Orta

Healthcare management system

Orta, formerly MediBridge, is a patient records platform for hospitals. It turns the paper, scanned, and photographed records hospitals already keep into structured patient profiles, gives staff one place to manage diagnoses, medications, allergies, labs, vitals, and encounters, and moves records between hospitals once the patient approves.

## Why I built it

Picture this: a patient is rushed unconscious from a clinic in Surulere to a specialist hospital in Victoria Island. The only record that travels with her is a smudged, handwritten note in a Ghana-must-go bag. The receiving doctor has maybe ten minutes to decide. This happens every day.

Platforms like Epic and Oracle Health assume big IT budgets and fully digital workflows, which many Nigerian hospitals don’t have. So I asked: what if we could transform the patient records hospitals already have, the PDFs, scans, and WhatsApp photos, into something the next doctor can search, review, and trust?

## My role

Design Engineer. I designed and built it, from ideation to implementation.

## Patient Onboarding

Staff upload the patient documents the hospital already has, including printed forms, scanned records, photos, and digital PDFs and Word files. Orta extracts text directly from digital documents and uses OCR for scans and photos. A language model then organises the extracted information into structured patient details, covering personal information, contact details, emergency contacts, and physical details.

Nothing is saved automatically. Staff review the extracted information one patient at a time, with access to the original source document just one click away. Fields missing from the source are left empty for staff to complete. When processing a batch, a failed file can be retried independently without affecting the others.

## Patient Management

Each patient profile organises medical information into dedicated sections, including vitals, diagnoses, medications, labs, and encounters. Staff can browse each section through a list and open individual records for more detail.

Changes are saved at the field level, so only the information that has been edited is updated. Every change is recorded in an audit log, including who made it and the values before and after the edit. Encounters bring together the vitals, medications, and other clinical information recorded during a patient’s visit.

## Patient Records Transfer

Patient records often move between hospitals through email, printed documents, and messaging apps, making it difficult to track what has been shared and when.

Orta provides a structured transfer process. Staff select the patient’s records and the receiving hospital, then send a request for patient approval. No records are shared until the patient approves the request through their email. Once approved, the receiving hospital uses a short-lived access code to open a read-only view of the authorised records. Access expires after the handover, while the sending hospital can track the request from pending to completed.

## Next

- [Knowledge CI](https://chibu.dev/knowledge-ci.md)
`;

export function GET() {
	return new Response(markdown, {
		headers: { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept" },
	});
}
