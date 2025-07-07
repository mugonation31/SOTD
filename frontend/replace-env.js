const fs = require('fs');
const path = require('path');

// Debug: Log working directory and file paths
console.log('🔍 Current working directory:', process.cwd());
console.log('🔍 __dirname:', __dirname);
console.log('🔍 Debugging environment variables:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'Not found');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Found' : 'Not found');

// Use absolute paths and ensure directory exists
const envDir = path.resolve(__dirname, 'src/environments');
const envPath = path.join(envDir, 'environment.ts');
const envProdPath = path.join(envDir, 'environment.prod.ts');

console.log('🔍 Environment directory:', envDir);
console.log('🔍 Environment.ts path:', envPath);
console.log('🔍 Environment.prod.ts path:', envProdPath);

// Ensure the environments directory exists
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
  console.log('✅ Created environments directory');
}

// Check if environment files exist
console.log('🔍 Checking environment.ts:', fs.existsSync(envPath) ? 'EXISTS' : 'MISSING');
console.log('🔍 Checking environment.prod.ts:', fs.existsSync(envProdPath) ? 'EXISTS' : 'MISSING');

// Get environment variables from Cloudflare
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Always ensure environment.ts exists with default content
const baseEnvContent = `export const environment = {
  production: false,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  }
};`;

try {
  fs.writeFileSync(envPath, baseEnvContent);
  console.log('✅ Created/updated environment.ts file');
} catch (error) {
  console.error('❌ Error writing environment.ts:', error.message);
  process.exit(1);
}

// Update environment.prod.ts
let prodEnvContent;
if (supabaseUrl && supabaseKey) {
  prodEnvContent = `export const environment = {
  production: true,
  supabase: {
    url: '${supabaseUrl}',
    key: '${supabaseKey}'
  }
};`;
  console.log('✅ Using environment variables from Cloudflare Pages');
} else {
  prodEnvContent = `export const environment = {
  production: true,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  }
};`;
  console.log('⚠️  Using default environment values - missing Cloudflare environment variables');
}

try {
  fs.writeFileSync(envProdPath, prodEnvContent);
  console.log('✅ Updated environment.prod.ts file');
} catch (error) {
  console.error('❌ Error writing environment.prod.ts:', error.message);
  process.exit(1);
}

// Final verification
console.log('🔍 Final verification:');
console.log('environment.ts exists:', fs.existsSync(envPath));
console.log('environment.prod.ts exists:', fs.existsSync(envProdPath));

if (fs.existsSync(envPath) && fs.existsSync(envProdPath)) {
  console.log('✅ All environment files are ready for build');
} else {
  console.error('❌ Environment files are missing after script execution');
  process.exit(1);
}