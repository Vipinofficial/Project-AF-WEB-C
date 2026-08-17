import { createApiClient } from '@arli/api-client';

/**
 * The one API client for this app.
 *
 * `VITE_API_URL` is inlined by Vite at build time, so each environment needs its
 * own build. No fallback on purpose — a missing value throws at startup with a
 * clear message rather than silently requesting `undefined/api/listings`.
 * See .env.example.
 */
export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
});
