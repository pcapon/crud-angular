import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientViewComponent }   from './patient-view/patient-view.component';
import { DoctorViewComponent }      from './doctor-view/doctor-view.component';
import { PatientDetailViewComponent }  from './patient-detail-view/patient-detail-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: PatientViewComponent },
  { path: 'detail/:id', component: PatientDetailViewComponent },
  { path: 'doctor', component: DoctorViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}