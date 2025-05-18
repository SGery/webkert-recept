import { NgModule } from '@angular/core';
import { CoreModule } from './core.module';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    RouterModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() =>
        initializeApp({
            projectId: "webkert-recept",
            appId: "1:415844713594:web:9c6ea6f61eee96c71da7c3",
            storageBucket: "webkert-recept.firebasestorage.app",
            apiKey: "AIzaSyBJ7F3enoMK4fcfEPpI6FsyruZNPEo2u7U",
            authDomain: "webkert-recept.firebaseapp.com",
            messagingSenderId: "415844713594" })),
        provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
})
export class AppModule {}
