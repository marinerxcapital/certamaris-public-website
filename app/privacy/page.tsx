import { legalDocuments } from "@/lib/legal-documents";
import { pageMetadata } from "@/lib/metadata";

const document = legalDocuments.privacy;

export const metadata = pageMetadata("Privacy Policy Status", document.description, "/privacy");
export { default } from "../legal/privacy/page";
