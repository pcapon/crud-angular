import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent implements OnInit {
  fullDoctors: any;
  constructor(
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.getFull();
  }

  getFull(): void {
    this.doctorService.getFull().subscribe(result => {
      this.fullDoctors = result;
      console.log(this.fullDoctors);
    })
  }

}
