# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->

## 2026-03-19
- Hardened `scripts/dev-supervisor.js` for Railway/container runtime:
  - `GIT_BOOTSTRAP` now defaults to `true` when `REPO_URL` is provided (can be disabled via `GIT_BOOTSTRAP=false`).
  - `GIT_POLL` default is `true` (can be disabled via `GIT_POLL=false`).
  - Removed destructive runtime git cleanup behavior (`git clean -fd`).
  - Added `pnpm exec next` fallback when `.bin/next` is not found.
  - Added explanatory inline comments for future maintainers/agents.
- Updated Next config to set explicit Turbopack root to project root (`turbopack.root`).
- Updated Docker app image install step to force clean dependency install:
  - `RUN rm -rf node_modules && pnpm install --prefer-offline --no-frozen-lockfile`
- Updated README supervisor/runtime notes to match current defaults and env-file behavior.
