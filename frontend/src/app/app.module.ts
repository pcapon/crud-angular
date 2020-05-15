import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientViewComponent,
    DoctorViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
