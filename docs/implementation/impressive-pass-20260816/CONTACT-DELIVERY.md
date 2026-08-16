# Contact Delivery — Owner Runbook

**Signed:** Cursor Cloud Agent · **Date:** 2026-08-16  
**Status:** Implementation complete in Worker; **production secrets not set by agent** (cannot invent endpoints).

## Truth

The Cloudflare Worker (`worker/index.ts`) handles `POST /api/contact` with:

1. Validation + honeypot + timing
2. Idempotency via KV (`CONTACT_IDEMPOTENCY`)
3. Rate limiting
4. Delivery via `CONTACT_EMAIL` binding **or** signed forwarder (`CONTACT_FORWARD_ENDPOINT` + `CONTACT_FORWARD_SECRET`)
5. Fail-closed **503** when delivery is unavailable, with mailto fallbacks in UI

Marketing copy on `/contact` assumes routing is honest. Without secrets, users see the failure path — correct behavior, but not impressive for buyers.

## Owner steps (do not commit secret values)

```bash
cd <marketing-sot>
npx wrangler secret put CONTACT_FORWARD_ENDPOINT --config wrangler.jsonc
npx wrangler secret put CONTACT_FORWARD_SECRET --config wrangler.jsonc
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

Alternative: configure Cloudflare Email Workers binding `CONTACT_EMAIL` + from/to vars per Worker code comments.

## E2E verify

1. Open https://certamaris.com/contact?intent=demo
2. Submit a real test with a monitored inbox
3. Expect **200** and redirect/UX to submitted state
4. Confirm forwarder/inbox received payload
5. Tell the next agent session “contact E2E green” — **never paste secrets**

## Related

- `.env.example` — documents vars
- `lib/contact-request.ts` — payload shape
- `docs/CODEX_MARKETING_TAKEOVER.md` §6 — historical contact status

**Signed:** Cursor Cloud Agent · 2026-08-16
