import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupabaseError } from '../errors/supabase-error';

/**
 * Centralised logger. In dev, prints full context + raw details to the
 * console. In prod, prints only context + the user-safe message for
 * SupabaseError — raw Postgres messages stay out of the browser console.
 * Warnings are suppressed entirely in prod (dev-only diagnostics).
 *
 * Pages and services should inject this and call `error(context, err)`
 * or `warn(context, details?)` instead of `console.error` / `console.warn`
 * directly.
 */
@Injectable({ providedIn: 'root' })
export class LoggerService {
  /**
   * Log an error. In dev: raw Supabase error messages included. In prod:
   * only the sanitized `userMessage` for SupabaseError, plus the context.
   */
  error(context: string, err: unknown): void {
    if (!environment.production) {
      // Full detail for dev debugging
      console.error(`[${context}]`, err);
      return;
    }

    // Prod: sanitize
    if (err instanceof SupabaseError) {
      console.error(`[${context}] ${err.userMessage}`);
    } else if (err instanceof Error) {
      // For non-SupabaseError instances in prod, print only a generic
      // marker — the raw message may or may not be safe
      console.error(`[${context}] An error occurred`);
    } else {
      console.error(`[${context}] Unknown error`);
    }
  }

  /**
   * Log a warning. Suppressed entirely in prod — warnings are for dev
   * diagnostics (e.g. silent-swallow fallbacks).
   */
  warn(context: string, details?: unknown): void {
    if (environment.production) {
      return;
    }
    if (details === undefined) {
      console.warn(`[${context}]`);
    } else {
      console.warn(`[${context}]`, details);
    }
  }
}
