import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientViewComponent, PatientAddDialog } from './patient-view/patient-view.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';

import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    PatientViewComponent,
    DoctorViewComponent,
    PatientAddDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
