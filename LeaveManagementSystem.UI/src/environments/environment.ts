// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "https://localhost:44326/api",
  defaultPassword: "P@ssword1",
  firebase: {
    projectId: 'filleupload-d41e8',
    appId: '1:122086441414:web:bfcbd2530598889c0372c7',
    databaseURL: 'https://filleupload-d41e8-default-rtdb.firebaseio.com',
    storageBucket: 'filleupload-d41e8.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDKycfv983HBcuJ7gWiL0ak02GQYH0N_8M',
    authDomain: 'filleupload-d41e8.firebaseapp.com',
    messagingSenderId: '122086441414',
    measurementId: 'G-J58Z531TR4',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
