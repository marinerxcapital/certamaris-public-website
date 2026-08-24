import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.privacy;

export const metadata = pageMetadata("Privacy Policy - legacy route", document.description, "/privacy", {
  noIndex: true,
});
export { default } from "../legal/privacy/page";
