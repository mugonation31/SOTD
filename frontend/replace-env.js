const fs = require('fs');
const path = require('path');

console.log('🔍 Starting environment replacement...');
console.log('Working directory:', process.cwd());

// Required env vars — fail loudly if missing rather than silently baking
// stale/wrong credentials into the production bundle. Optional ones
// (API_URL, ENCRYPTION_KEY) fall back to safe empty defaults.
const missing = [];
if (!process.env.SUPABASE_URL) missing.push('SUPABASE_URL');
if (!process.env.SUPABASE_ANON_KEY) missing.push('SUPABASE_ANON_KEY');

if (missing.length > 0) {
  console.error('❌ Missing required environment variable(s):', missing.join(', '));
  console.error('   These must be set before running a production build.');
  console.error('   Locally: add them to .envrc (see CLAUDE.md → Production Docker).');
  console.error('   Cloudflare: set in the Pages dashboard under project settings.');
  console.error('   Docker: pass via --build-arg on `docker build`.');
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const apiUrl = process.env.API_URL || '';
const encryptionKey = process.env.ENCRYPTION_KEY || '';

console.log('Environment variables:');
console.log('- SUPABASE_URL: Found');
console.log('- SUPABASE_ANON_KEY: Found');
console.log('- API_URL:', process.env.API_URL ? 'Found' : 'Empty (optional)');
console.log('- ENCRYPTION_KEY:', process.env.ENCRYPTION_KEY ? 'Found' : 'Empty (optional)');

// Determine the correct path - check if we're in root or frontend directory.
// Prod builds use environment.prod.ts (via angular.json fileReplacements), so
// that is the primary target. We still fall back to environment.ts for legacy
// callers (e.g. Cloudflare Pages builds that may run this before fileReplacements).
let envPath;
const possiblePaths = [
  path.join(process.cwd(), 'src', 'environments', 'environment.prod.ts'), // Preferred (prod build target)
  path.join(process.cwd(), 'frontend', 'src', 'environments', 'environment.prod.ts'),
  path.join(process.cwd(), 'src', 'environments', 'environment.ts'), // Fallback
  path.join(process.cwd(), 'frontend', 'src', 'environments', 'environment.ts')
];

// Find the correct path
for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    envPath = possiblePath;
    break;
  }
}

if (!envPath) {
  console.error('❌ Could not find environment.prod.ts or environment.ts in any of these locations:');
  possiblePaths.forEach(p => console.error(`   - ${p}`));
  console.error('Current working directory:', process.cwd());
  console.error('Directory contents:', fs.readdirSync(process.cwd()));
  process.exit(1);
}

console.log('📍 Using environment file:', envPath);

try {
  // Read the environment file
  let content = fs.readFileSync(envPath, 'utf8');

  console.log('📄 Original content preview:', content.substring(0, 200) + '...');

  // Replace placeholders with actual values
  content = content.replace(/__SUPABASE_URL__/g, supabaseUrl);
  content = content.replace(/__SUPABASE_ANON_KEY__/g, supabaseKey);
  content = content.replace(/__API_URL__/g, apiUrl);
  content = content.replace(/__ENCRYPTION_KEY__/g, encryptionKey);

  // Write the updated content back
  fs.writeFileSync(envPath, content);

  console.log('✅ Successfully updated', path.basename(envPath));
  console.log('📄 Updated content preview:', content.substring(0, 200) + '...');

} catch (error) {
  console.error('❌ Error updating environment file:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}

console.log('🔍 Final verification:');
console.log(path.basename(envPath), 'exists:', fs.existsSync(envPath));
console.log('✅ Environment replacement complete');