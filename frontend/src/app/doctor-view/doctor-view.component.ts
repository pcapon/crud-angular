import { Component, OnInit, Inject } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from '../doctor';

export interface DialogData {
  mode: string,
  form: {
    firstName: string;
    lastName: string;
    speciality: string;
  }
}
@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.scss']
})
export class DoctorViewComponent implements OnInit {
  fullDoctors: any;
  constructor(
    private doctorService: DoctorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
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


  deleteDoctor(doctor): void {
    this.doctorService.deleteDoctor(doctor._id).subscribe(() => {
      this._snackBar.open(`${doctor.firstName} ${doctor.lastName}  deleted`, 'close', {
        duration: 2000,
      });
      this.getFull();
    });
  }

  openDialog(doctor) {
    const dialogRef = this.dialog.open(DoctorAddDialog, {
      data: {
        mode: doctor ? 'edit' : 'add',
        form: {
          lastName: doctor?.lastName || '',
          firstName: doctor?.firstName || '',
          speciality: doctor?.speciality || '',
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const finalDoctor = {
          _id: doctor?._id || null,
          lastName: result.lastName.trim(),
          firstName: result.firstName.trim(),
          speciality: result.speciality,
        };
        if (doctor) {
          this.doctorService.updateDoctor(finalDoctor as Doctor).subscribe(() => {
            this.getFull();
          });
        }
        else {
          this.doctorService.addDoctor(finalDoctor as Doctor).subscribe(() => {
            this.getFull();
          });
        }
      }
    });
  }

}

@Component({
  selector: 'doctor-add-dialog',
  templateUrl: 'doctor-add-dialog.component.html',
})
export class DoctorAddDialog {
  constructor(public dialogRef: MatDialogRef<DoctorAddDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}