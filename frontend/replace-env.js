const fs = require('fs');
const path = require('path');

// Debug: Log working directory and file paths
console.log('🔍 Current working directory:', process.cwd());
console.log('🔍 __dirname:', __dirname);
console.log('🔍 Debugging environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'Not found');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Found' : 'Not found');

// Check if environment files exist
const envPath = path.join(__dirname, 'src/environments/environment.ts');
const envProdPath = path.join(__dirname, 'src/environments/environment.prod.ts');
console.log('🔍 Checking environment.ts:', fs.existsSync(envPath) ? 'EXISTS' : 'MISSING');
console.log('🔍 Checking environment.prod.ts:', fs.existsSync(envProdPath) ? 'EXISTS' : 'MISSING');

// Get environment variables from Cloudflare
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// First, ensure environment.ts exists with placeholder content
if (!fs.existsSync(envPath)) {
  const baseEnvContent = `export const environment = {
  production: false,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  }
};`;
  fs.writeFileSync(envPath, baseEnvContent);
  console.log('✅ Created missing environment.ts file');
}

if (supabaseUrl && supabaseKey) {
  // Update environment.prod.ts with actual values
  const envContent = `export const environment = {
  production: true,
  supabase: {
    url: '${supabaseUrl}',
    key: '${supabaseKey}'
  }
};`;
  
  fs.writeFileSync(envProdPath, envContent);
  console.log('✅ Environment variables updated for production build');
  console.log('📝 Generated environment.prod.ts with values from Cloudflare');
} else {
  console.log('⚠️  Using default environment values');
  console.log('❌ Missing environment variables - check Cloudflare Pages settings');
}