import { LegalStatusPage } from "@/components/LegalStatusPage";
import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.dpa;

export const metadata = pageMetadata(document.title, document.description, document.path);

export default function LegalDpaPage() {
  return <LegalStatusPage document={document} />;
}
