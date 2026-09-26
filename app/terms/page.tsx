import { publicLegalDocumentsBySlug } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = publicLegalDocumentsBySlug.terms;

export const metadata = pageMetadata("Business Terms", document.description, "/terms", {
  noIndex: true,
});
export { default } from "../legal/terms/page";
