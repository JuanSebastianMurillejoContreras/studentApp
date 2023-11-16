import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component( {
  standalone: true,
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe, RouterLink]
} )
export class StudentEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private studentService: StudentService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      idStudent: new FormControl( 0 ),
      dni: new FormControl( '', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      fistName: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.minLength( 2 ), Validators.maxLength(35)]),
      lastName: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)] ),
      gender: new FormControl( '', [Validators.required, Validators.minLength( 8 ), Validators.maxLength(10)] ),
      age: new FormControl( '', [Validators.required, Validators.min(6), Validators.max(18)] ),
      birthDate: new FormControl( '', [Validators.required] ),
    } );

    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    } )
  }


  initForm() {
    if ( this.isEdit ) {
      this.studentService.findById( this.id ).subscribe( data => {
        this.form = new FormGroup( {
          idStudent: new FormControl( data.idStudent ),
          dni: new FormControl( data.dni, [Validators.required, Validators.minLength( 3 )] ),
          fistName: new FormControl( data.fistName, [Validators.required, Validators.minLength( 3 )] ),
          lastName: new FormControl( data.lastName, [Validators.required, Validators.minLength( 3 )] ),
          gender: new FormControl( data.gender, [Validators.required, Validators.minLength( 8 ), Validators.maxLength(10)] ),
          age: new FormControl( data.age, [Validators.required, Validators.min(6), Validators.max(18)]),
          birthDate: new FormControl( data.birthDate, [Validators.required])          
        } );
      } );
    }
  }

  operate() {
    if ( this.form.invalid ) {
      this._snackBar.open( 'Form is invalid', 'INFO', { duration: 2000 } );
      return;
    }
    const student: Student = new Student();
    student.idStudent = this.form.value['idStudent'];
    student.dni = this.form.value['dni'];
    student.fistName = this.form.value['fistName'];
    student.lastName = this.form.value['lastName'];
    student.gender = this.form.value['gender'];
    student.age = this.form.value['age'];
    student.birthDate = moment(this.form.value['birthDate']).format('YYYY-MM-DDTHH:mm:ss');;        

    if ( this.isEdit ) {
      
      this.studentService.update( this.id, student ).subscribe( () => {
        this.studentService.findAll().subscribe( data => {
          this.studentService.setStudentChange( data );
          this.studentService.setMessageChange( 'UPDATED!' )
        } )
      } );
    } else {
   
      this.studentService.save( student ).pipe( switchMap( () => {
        return this.studentService.findAll();
      } ) )
        .subscribe( data => {
          this.studentService.setStudentChange( data );
          this.studentService.setMessageChange( 'CREATED!' )
        } );
    }

    this.router.navigate(['/pages/student']);
  }


  get f() {
    return this.form.controls;
  }

}
