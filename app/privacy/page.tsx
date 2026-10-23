import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.privacy;

export const metadata = pageMetadata("Privacy Policy Legacy Redirect", document.description, "/privacy", {
  noIndex: true,
  canonicalPath: "/legal/privacy",
});
export { default } from "../legal/privacy/page";
