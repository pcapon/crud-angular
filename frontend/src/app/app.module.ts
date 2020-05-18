import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientViewComponent, PatientAddDialog } from './patient-view/patient-view.component';
import { DoctorViewComponent, DoctorAddDialog } from './doctor-view/doctor-view.component';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { PatientDetailViewComponent, TreatmentAddDialog, TreatmentAddExistDialog, DrugAddExistDialog, DrugAddDialog } from './patient-detail-view/patient-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientViewComponent,
    DoctorViewComponent,
    PatientAddDialog,
    PatientDetailViewComponent,
    TreatmentAddDialog,
    DoctorAddDialog,
    TreatmentAddExistDialog,
    DrugAddExistDialog,
    DrugAddDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
