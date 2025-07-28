module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testEnvironment: 'jsdom',
  
  // Module name mapping for absolute imports and Ionic/Angular modules
  moduleNameMapping: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^@app/(.*)': '<rootDir>/src/app/$1',
    '^@environments/(.*)': '<rootDir>/src/environments/$1',
    '^@assets/(.*)': '<rootDir>/src/assets/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub'
  },
  
  // Transform files
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  
  // File extensions to recognize
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|js)',
    '<rootDir>/src/**/*.(test|spec).(ts|js)'
  ],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/app/**/*.{ts,js}',
    '!src/app/**/*.{d.ts}',
    '!src/app/**/{index,main,polyfills}.ts',
    '!src/app/**/*.{module,routing}.ts',
    '!src/app/**/*.{interface,type,enum,constant}.ts'
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/'
  ],
  
  // Setup for Ionic/Angular testing
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@ionic|@stencil|ionicons|@angular|@ngrx|@supabase))'
  ],
  
  // Global variables for testing
  globals: {
    'ts-jest': {
      useESM: true,
      stringifyContentPathRegex: '\\.(html|svg)$'
    }
  },
  
  // Verbose output for debugging
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Automatically restore mock state between every test
  restoreMocks: true
};