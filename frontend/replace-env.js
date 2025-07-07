import fs from 'fs';
import path from 'path';

// Debug: Log all environment variables
console.log('🔍 Debugging environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'Not found');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Found' : 'Not found');

// Get environment variables from Cloudflare
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  // Update environment.prod.ts with actual values
  const envPath = path.join(__dirname, 'src/environments/environment.prod.ts');
  const envContent = `export const environment = {
  production: true,
  supabase: {
    url: '${supabaseUrl}',
    key: '${supabaseKey}'
  }
};`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment variables updated for production build');
  console.log('📝 Generated environment.prod.ts with values from Cloudflare');
} else {
  console.log('⚠️  Using default environment values');
  console.log('❌ Missing environment variables - check Cloudflare Pages settings');
}
