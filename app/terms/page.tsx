import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.terms;

export const metadata = pageMetadata("Business Terms Status", document.description, "/terms");
export { default } from "../legal/terms/page";
