import { LegalDocumentPage } from "@/components/LegalDocumentPage";
import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.cookies;

export const metadata = pageMetadata(document.title, document.description, document.route);

export default function LegalCookiesPage() {
  return <LegalDocumentPage document={document} />;
}
