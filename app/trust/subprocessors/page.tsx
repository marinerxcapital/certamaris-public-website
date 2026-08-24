import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.subprocessors;

export const metadata = pageMetadata("Subprocessors - trust route", document.description, "/trust/subprocessors", {
  noIndex: true,
});

export default function TrustSubprocessorsPage() {
  return <LegalDocumentPage document={document} />;
}
