const fs = require('fs');
const path = require('path');

console.log('🔍 Starting environment replacement...');
console.log('Working directory:', process.cwd());

// Get environment variables with defaults
const supabaseUrl = process.env.SUPABASE_URL || 'https://lmybyfrhzarxmantttki.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ';
const apiUrl = process.env.API_URL || 'https://api.example.com';
const encryptionKey = process.env.ENCRYPTION_KEY || 'your-encryption-key-here';

console.log('Environment variables:');
console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'Using default');
console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Found' : 'Using default');
console.log('- API_URL:', process.env.API_URL ? 'Found' : 'Using default');
console.log('- ENCRYPTION_KEY:', process.env.ENCRYPTION_KEY ? 'Found' : 'Using default');

// Path to the environment file
const envPath = path.join(process.cwd(), 'src', 'environments', 'environment.ts');

try {
  // Read the environment file
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Replace placeholders with actual values
  content = content.replace('__SUPABASE_URL__', supabaseUrl);
  content = content.replace('__SUPABASE_ANON_KEY__', supabaseKey);
  content = content.replace('__API_URL__', apiUrl);
  content = content.replace('__ENCRYPTION_KEY__', encryptionKey);
  
  // Write the updated content back
  fs.writeFileSync(envPath, content);
  
  console.log('✅ Successfully updated environment.ts');
  
} catch (error) {
  console.error('❌ Error updating environment file:', error.message);
  process.exit(1);
}

console.log('🔍 Final verification:');
console.log('environment.ts exists:', fs.existsSync(envPath));
console.log('✅ Environment replacement complete');