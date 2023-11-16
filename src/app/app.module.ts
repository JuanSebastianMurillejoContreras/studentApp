import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SubjectComponent } from './pages/subject/subject.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
