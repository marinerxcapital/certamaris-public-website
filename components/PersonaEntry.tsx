"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_HOME_COPY,
  getPersona,
  isPersonaId,
  PERSONA_STORAGE_KEY,
  PERSONAS,
  type Persona,
  type PersonaId,
} from "@/lib/personas";

type PersonaSelection = {
  persona: Persona | null;
  /** True after hydration so SSR and first paint stay persona-neutral. */
  ready: boolean;
  select: (id: PersonaId) => void;
  clear: () => void;
};

/**
 * Shared persona state for homepage hero and /demo scrub tour.
 * Persists in sessionStorage; URL ?persona= can set or override.
 * ?srqa=1 forces default (keeps sample-record QA deterministic).
 */
export function usePersonaSelection(): PersonaSelection {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("srqa")) {
      setPersona(null);
      setReady(true);
      return;
    }

    const fromQuery = params.get("persona");
    if (isPersonaId(fromQuery)) {
      const match = getPersona(fromQuery) ?? null;
      setPersona(match);
      if (match) {
        try {
          sessionStorage.setItem(PERSONA_STORAGE_KEY, match.id);
        } catch {
          /* ignore quota / private mode */
        }
      }
      setReady(true);
      return;
    }

    try {
      const stored = sessionStorage.getItem(PERSONA_STORAGE_KEY);
      setPersona(getPersona(stored) ?? null);
    } catch {
      setPersona(null);
    }
    setReady(true);
  }, []);

  const select = useCallback((id: PersonaId) => {
    const match = getPersona(id) ?? null;
    setPersona(match);
    try {
      if (match) sessionStorage.setItem(PERSONA_STORAGE_KEY, match.id);
      else sessionStorage.removeItem(PERSONA_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (match) url.searchParams.set("persona", match.id);
    else url.searchParams.delete("persona");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const clear = useCallback(() => {
    setPersona(null);
    try {
      sessionStorage.removeItem(PERSONA_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("persona");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  return { persona, ready, select, clear };
}

export function personaHomeCopy(persona: Persona | null) {
  if (!persona) return DEFAULT_HOME_COPY;
  return {
    ledger: persona.ledger,
    headline: persona.headline,
    support: persona.support,
    ctaHint: persona.ctaHint,
    sampleRecordId: persona.sampleRecordId,
    demoBeatId: persona.demoBeatId,
  };
}

type PersonaPickerProps = {
  selectedId: PersonaId | null;
  onSelect: (id: PersonaId) => void;
  onClear?: () => void;
  variant?: "hero" | "compact";
};

export function PersonaPicker({
  selectedId,
  onSelect,
  onClear,
  variant = "hero",
}: PersonaPickerProps) {
  const isCompact = variant === "compact";

  return (
    <div className={isCompact ? "persona-picker persona-picker--compact" : "persona-picker"}>
      <div className="persona-picker-head">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0e5a8a]">
          {selectedId ? "Viewing as" : "Start as"}
        </p>
        {selectedId && onClear ? (
          <button type="button" className="persona-clear" onClick={onClear}>
            Show default
          </button>
        ) : null}
      </div>
      <div
        role="group"
        aria-label="Choose your role"
        className={isCompact ? "persona-options persona-options--compact" : "persona-options"}
      >
        {PERSONAS.map((persona) => {
          const active = persona.id === selectedId;
          return (
            <button
              key={persona.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(persona.id)}
              className={`persona-option${active ? " is-active" : ""}`}
            >
              <span className="persona-option-label">{persona.label}</span>
            </button>
          );
        })}
      </div>
      {!selectedId ? (
        <p className="mt-3 text-[13px] leading-6 text-structural">
          Pick a role to adjust the sample record and product tour around the review pressure you carry.
        </p>
      ) : null}
      {selectedId ? (
        <p className="mt-3 text-[13px] text-structural">
          <Link
            href={getPersona(selectedId)?.audienceHref ?? "/who-we-serve"}
            className="font-semibold text-ocean hover:underline"
          >
            Role detail
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/who-we-serve" className="font-semibold text-ocean hover:underline">
            All roles
          </Link>
        </p>
      ) : null}
    </div>
  );
}
