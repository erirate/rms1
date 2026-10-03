# RateMySitter — CLAUDE.md

## Stack
- Frontend: Next.js App Router + Tailwind CSS v4
- Backend: Firebase + Firestore (Week 1D — not yet wired)
- Auth: Firebase Auth + Twilio SMS OTP (Week 3)
- Payments: Stripe (Week 9)
- Hosting: Vercel

## Critical Constraints (NEVER violate)
- Teen sitters (is_teen=true): NEVER expose last name, photo, contact info until claimed
- All Firestore writes validated server-side via security rules, never trust client data
- COPPA: no data collection from users under 13

## Firestore Schema (add to as you build)
- sitters/{id}: name, city, state, is_teen, verification_level (0/1/2), claimed_at
- reviews/{id}: sitter_id, parent_id, ratings{reliability,communication,professionalism,engagement,safety}, tags[], comment, display_name
- parents/{id}: uid, email, created_at

## Brand Colors
- Navy: #1B2A4A (primary)
- Trust Green: #16A34A (accent)
- Soft Blue: #2563EB (secondary)

## Patterns
- Week 1: UI-only, all data mocked in lib/mockData.ts — no Firestore yet
- Tailwind v4: custom colors defined in app/globals.css @theme block as --color-* vars

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
