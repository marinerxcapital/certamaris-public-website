import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.privacy;

export const metadata = pageMetadata(document.title, document.description, document.route);

export default function LegalPrivacyPage() {
  return <LegalDocumentPage document={document} />;
}
