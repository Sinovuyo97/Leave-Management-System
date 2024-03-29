import { AppConfiguration} from './app-configuration';
import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfiguration>('app.configuration');

export const APP_CONFIG : AppConfiguration ={
    apiUrl: environment.apiUrl,
    production: environment.production,
    defaultPassword: environment.defaultPassword,
    // googleApiKey: environment.googleApiKey,
    firebase: {
        projectId: environment.firebase.projectId,
        appId:  environment.firebase.appId,
        databaseURL:  environment.firebase.databaseURL,
        storageBucket: environment.firebase.storageBucket,
        locationId: environment.firebase.locationId,
        apiKey: environment.firebase.apiKey,
        authDomain: environment.firebase.authDomain,
        messagingSenderId: environment.firebase.messagingSenderId,
        measurementId: environment.firebase.measurementId
    }
}