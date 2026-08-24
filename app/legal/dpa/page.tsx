import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.dpa;

export const metadata = pageMetadata(document.title, document.description, document.route);

export default function LegalDpaPage() {
  return <LegalDocumentPage document={document} />;
}
