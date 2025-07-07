// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    supabase: {
      url: 'https://lmybyfrhzarxmantttki.supabase.co',
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteWJ5ZnJoemFyeG1hbnR0dGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDk1MzAsImV4cCI6MjA2NzMyNTUzMH0.SkXjmFSBHQZp8Y74dnnNbwOwotJH3pX1OV6fIN4TFWQ'
    },
    apiUrl: 'http://localhost:3000', // Local development API
    encryptionKey: 'dev-encryption-key' // Development encryption key
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.