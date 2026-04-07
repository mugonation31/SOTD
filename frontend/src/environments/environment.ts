// This will be set to true by Angular's production build
declare const ngDevMode: boolean;
const isProduction = typeof ngDevMode !== 'undefined' ? !ngDevMode : false;

// Production configuration
const productionConfig = {
  production: true,
  supabase: {
    url: 'https://zsoevdobcpgacrvgqlkx.supabase.co',
    key: 'sb_publishable_ZMjkT0bUqPW7s9-hCKe07Q_o6PlvPk7'
  },
  apiUrl: 'https://api.example.com',
  encryptionKey: 'your-encryption-key-here'
};

// Development configuration
const developmentConfig = {
  production: false,
  supabase: {
    url: 'https://zsoevdobcpgacrvgqlkx.supabase.co',
    key: 'sb_publishable_ZMjkT0bUqPW7s9-hCKe07Q_o6PlvPk7'
  },
  apiUrl: 'http://localhost:3000',
  encryptionKey: 'dev-encryption-key'
};

export const environment = isProduction ? productionConfig : developmentConfig;