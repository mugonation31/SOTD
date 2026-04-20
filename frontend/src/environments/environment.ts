// Dev/test environment only.
// Production builds use `environment.prod.ts` via Angular's `fileReplacements`
// in angular.json — do NOT embed a production config in this file.
//
// The values below are public by design: the Supabase project URL is public,
// and the `sb_publishable_*` / anon key is the publishable key intended for
// client bundles (protected by Row Level Security, not secrecy).
export const environment = {
  production: false,
  supabase: {
    url: 'https://zsoevdobcpgacrvgqlkx.supabase.co',
    key: 'sb_publishable_ZMjkT0bUqPW7s9-hCKe07Q_o6PlvPk7'
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};
