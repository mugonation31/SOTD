module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
      customExportConditions: ['node', 'node-addons'],
    },


    
    // Module name mapping for absolute imports and Ionic/Angular modules
  moduleNameMapper: {
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
          stringifyContentPathRegex: '\\.(html|svg)$',
          useESM: true,
          isolatedModules: false
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
    
    // Ignore patterns
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
      '<rootDir>/e2e/'
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
    

    
  // Setup for Ionic/Angular testing - include Supabase and other ESM modules
    transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|@ionic|@stencil|ionicons|@angular|@ngrx|@supabase|supabase|isows|@supabase/realtime-js|@supabase/gotrue-js|@supabase/postgrest-js|@supabase/storage-js))'
  ],
    
    // Verbose output for debugging
    verbose: true,
    
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    
    // Automatically restore mock state between every test
    restoreMocks: true
  };