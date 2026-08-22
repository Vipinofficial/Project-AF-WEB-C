import { createApiClient } from '@arli/api-client';

/**
 * The one API client for this app.
 *
 * This app is one of four standalone clients (customer/merchant × web/native)
 * that all talk to the SAME hosted ARLI API — there is one backend, deployed
 * once, shared by all of them. That URL is the default below.
 *
 * `VITE_API_URL` is inlined by Vite at build time, so set it in `.env` to
 * point at a different backend (e.g. localhost during API development).
 */
const SHARED_BACKEND_URL = 'https://project-af-backend.onrender.com';

export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL || SHARED_BACKEND_URL,
});
