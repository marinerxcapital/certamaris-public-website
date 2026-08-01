"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import type { Article } from "@/lib/resources";
import { filterArticles, resourceKinds, resourceTags, resourceTopics } from "@/lib/resources";

function normalizeKind(raw: string | null): string {
  if (!raw) return "all";
  const v = raw.toLowerCase();
  if (v === "guides" || v === "guide") return "guide";
  if (v === "checklists" || v === "checklist") return "checklist";
  if (v === "explainers" || v === "explainer") return "explainer";
  if (resourceKinds.includes(v as Article["kind"])) return v;
  return "all";
}

function normalizeTag(raw: string | null): string {
  if (!raw) return "all";
  const v = raw.trim();
  if (!v || v === "all") return "all";
  // Nav may pass plural buckets that are kinds, not tags
  if (["guides", "guide", "checklists", "checklist", "templates", "explainers"].includes(v.toLowerCase())) {
    return "all";
  }
  const match = resourceTags.find((t) => t.toLowerCase() === v.toLowerCase());
  return match ?? "all";
}

export function ResourcesFilter({ articles: allArticles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const initialKind = normalizeKind(searchParams.get("kind") ?? searchParams.get("tag"));
  const initialTag = normalizeTag(searchParams.get("tag"));
  const initialTopic = searchParams.get("topic") ?? "all";
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [topic, setTopic] = useState(
    resourceTopics.includes(initialTopic) ? initialTopic : "all"
  );
  const [tag, setTag] = useState(initialTag);
  const [kind, setKind] = useState(initialKind);

  const filtered = useMemo(
    () => filterArticles({ query, topic, tag, kind }),
    [query, topic, tag, kind]
  );

  return (
    <div className="space-y-8">
      <div className="liquid-glass liquid-glass--strong lg-pad-md grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="block text-[13px] font-medium text-navy">
          Search
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, tags, body…"
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white/80 px-3 py-2 text-[14px] text-navy outline-none focus:border-ocean"
            aria-label="Search resources"
          />
        </label>
        <label className="block text-[13px] font-medium text-navy">
          Topic
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white/80 px-3 py-2 text-[14px] text-navy outline-none focus:border-ocean"
            aria-label="Filter by topic"
          >
            <option value="all">All topics</option>
            {resourceTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[13px] font-medium text-navy">
          Tag
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white/80 px-3 py-2 text-[14px] text-navy outline-none focus:border-ocean"
            aria-label="Filter by tag"
          >
            <option value="all">All tags</option>
            {resourceTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-[13px] font-medium text-navy">
          Type
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-navy/15 bg-white/80 px-3 py-2 text-[14px] text-navy outline-none focus:border-ocean"
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            {resourceKinds.map((k) => (
              <option key={k} value={k}>
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="text-[13.5px] text-structural" aria-live="polite">
        Showing {filtered.length} of {allArticles.length} resources
        {(query || topic !== "all" || tag !== "all" || kind !== "all") && (
          <button
            type="button"
            className="ml-3 font-medium text-ocean hover:underline"
            onClick={() => {
              setQuery("");
              setTopic("all");
              setTag("all");
              setKind("all");
            }}
          >
            Clear filters
          </button>
        )}
      </p>

      {filtered.length === 0 ? (
        <p className="text-[15px] text-structural">No resources match these filters. Try clearing search or tags.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
