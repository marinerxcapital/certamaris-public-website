import { EditorialHome } from "@/components/EditorialHome";
import { SITE_DESCRIPTION } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Maritime Cyber Compliance Software",
  SITE_DESCRIPTION,
  "/",
);
export default function HomePage() {
  return <EditorialHome />;
}
