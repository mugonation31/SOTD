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

// Determine the correct path - check if we're in root or frontend directory
let envPath;
const possiblePaths = [
  path.join(process.cwd(), 'src', 'environments', 'environment.ts'), // If running from frontend/
  path.join(process.cwd(), 'frontend', 'src', 'environments', 'environment.ts') // If running from root
];

// Find the correct path
for (const possiblePath of possiblePaths) {
  if (fs.existsSync(possiblePath)) {
    envPath = possiblePath;
    break;
  }
}

if (!envPath) {
  console.error('❌ Could not find environment.ts file in any of these locations:');
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
  
  console.log('✅ Successfully updated environment.ts');
  console.log('📄 Updated content preview:', content.substring(0, 200) + '...');
  
} catch (error) {
  console.error('❌ Error updating environment file:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}

console.log('🔍 Final verification:');
console.log('environment.ts exists:', fs.existsSync(envPath));
console.log('✅ Environment replacement complete');