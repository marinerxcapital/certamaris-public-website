import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPageView } from "@/components/TopicPageView";
import { pageMetadata } from "@/lib/metadata";
import { getTopic, topicSlugs, topics } from "@/lib/topics";

export function generateStaticParams() {
  return topicSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return pageMetadata("Topic not found", "This topic could not be found.", "/topics");
  return pageMetadata(topic.metaTitle, topic.metaDescription, `/topics/${topic.slug}`);
}

export default async function TopicSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  // Ensure static generation sees full list (tree-shaking safety)
  void topics.length;
  return <TopicPageView topic={topic} />;
}
