/**
 * Domain error for Supabase-originated failures. Carries a user-safe
 * `userMessage` (suitable for toast copy) separately from the raw
 * Supabase error — raw messages can leak schema hints (column names,
 * constraint names, RLS denial reasons) and should never reach the UI.
 *
 * Usage:
 *   try { ... } catch (raw) {
 *     throw new SupabaseError({
 *       context: 'supabase.getGroups',
 *       userMessage: 'Unable to load groups',
 *       raw,
 *     });
 *   }
 *
 * Extends Error with `message = userMessage` so existing `.message`
 * assertions (500+ tests) keep working.
 */
export interface SupabaseErrorInit {
  context: string;
  userMessage: string;
  raw?: unknown;
}

export class SupabaseError extends Error {
  readonly context: string;
  readonly userMessage: string;
  readonly rawMessage: string;
  readonly raw: unknown;

  constructor(init: SupabaseErrorInit) {
    super(init.userMessage);
    this.name = 'SupabaseError';
    this.context = init.context;
    this.userMessage = init.userMessage;
    this.raw = init.raw;
    this.rawMessage = extractRawMessage(init.raw);
    // Maintains proper prototype chain when transpiled to ES5
    Object.setPrototypeOf(this, SupabaseError.prototype);
  }
}

/**
 * Best-effort extraction of a string message from an unknown raw value.
 * Supabase errors have `.message`, native Errors have `.message`, strings
 * are themselves, everything else falls back to the empty string.
 */
function extractRawMessage(raw: unknown): string {
  if (raw == null) return '';
  if (typeof raw === 'string') return raw;
  if (raw instanceof Error) return raw.message;
  if (typeof raw === 'object' && 'message' in raw) {
    const m = (raw as { message: unknown }).message;
    return typeof m === 'string' ? m : '';
  }
  return '';
}
