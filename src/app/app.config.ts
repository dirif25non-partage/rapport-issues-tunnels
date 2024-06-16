import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"stt-dett","appId":"1:905436523946:web:933ca3f27bfb58e7c64fd3","storageBucket":"stt-dett.appspot.com","apiKey":"AIzaSyBk8tS9_AA4xCb9Uf_uxppgPL_oXOlFxK0","authDomain":"stt-dett.firebaseapp.com","messagingSenderId":"905436523946","measurementId":"G-L1WBJYFDBR"})), provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
