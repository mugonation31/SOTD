// DO NOT hardcode secrets here — placeholders are substituted at build time by
// `replace-env.js` using process.env.SUPABASE_URL / SUPABASE_ANON_KEY /
// API_URL / ENCRYPTION_KEY. This file is used for production builds only
// via Angular's `fileReplacements` wiring in angular.json
// (replaces src/environments/environment.ts at build).
//
// Must mirror the shape of environment.ts exactly — consumers like
// SupabaseService and AuthService read environment.supabase.url,
// environment.supabase.key, environment.apiUrl, and environment.encryptionKey.

export const environment = {
  production: true,
  supabase: {
    url: '__SUPABASE_URL__',
    key: '__SUPABASE_ANON_KEY__'
  },
  apiUrl: '__API_URL__',
  encryptionKey: '__ENCRYPTION_KEY__'
};
