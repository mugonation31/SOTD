// This will be set to true by Angular's production build
declare const ngDevMode: boolean;
const isProduction = typeof ngDevMode !== 'undefined' ? !ngDevMode : false;

// Production configuration
const productionConfig = {
  production: true,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  },
  apiUrl: 'https://api.example.com',
  encryptionKey: 'your-encryption-key-here'
};

// Development configuration
const developmentConfig = {
  production: false,
  supabase: {
    url: 'https://lmybyfrhzarxmantttki.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};

export const environment = isProduction ? productionConfig : developmentConfig;