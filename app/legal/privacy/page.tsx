import { LegalStatusPage } from "@/components/LegalStatusPage";
import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.privacy;

export const metadata = pageMetadata(document.title, document.description, document.path);

export default function LegalPrivacyPage() {
  return <LegalStatusPage document={document} />;
}
