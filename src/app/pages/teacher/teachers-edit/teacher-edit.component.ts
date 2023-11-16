import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/service/teacher.service';

@Component( {
  standalone: true,
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe, RouterLink]
} )
export class TeacherEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      idTeacher: new FormControl( 0 ),
      dni: new FormControl( '', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      fistName: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.minLength( 2 ), Validators.maxLength(35)]),
      lastName: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)] ),
      gender: new FormControl( '', [Validators.required, Validators.minLength( 8 ), Validators.maxLength(10)] ),
      age: new FormControl( '', [Validators.required, Validators.min(18), Validators.max(70)] ),
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
      this.teacherService.findById( this.id ).subscribe( data => {
        this.form = new FormGroup( {
          idTeacher: new FormControl( data.idTeacher ),
          dni: new FormControl( data.dni, [Validators.required, Validators.minLength( 3 )] ),
          fistName: new FormControl( data.fistName, [Validators.required, Validators.minLength( 3 )] ),
          lastName: new FormControl( data.lastName, [Validators.required, Validators.minLength( 3 )] ),
          gender: new FormControl( data.gender, [Validators.required, Validators.minLength(8), Validators.maxLength(10)] ),
          age: new FormControl( data.age, [Validators.required, Validators.min(18), Validators.max(70)] ),
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
    const teacher: Teacher = new Teacher();
    teacher.idTeacher = this.form.value['idTeacher'];
    teacher.dni = this.form.value['dni'];
    teacher.fistName = this.form.value['fistName'];
    teacher.lastName = this.form.value['lastName'];
    teacher.gender = this.form.value['gender'];
    teacher.age = this.form.value['age'];
    teacher.birthDate = moment(this.form.value['birthDate']).format('YYYY-MM-DDTHH:mm:ss');     
  
    if ( this.isEdit ) {
      
      this.teacherService.update( this.id, teacher ).subscribe( () => {
        this.teacherService.findAll().subscribe( data => {
          this.teacherService.setTeacherChange( data );
          this.teacherService.setMessageChange( 'UPDATED!' )
        } )
      } );
    } else {
   
      this.teacherService.save( teacher ).pipe( switchMap( () => {
        return this.teacherService.findAll();
      } ) )
        .subscribe( data => {
          this.teacherService.setTeacherChange( data );
          this.teacherService.setMessageChange( 'CREATED!' )
        } );
    }

    this.router.navigate(['/pages/teacher']);
  }


  get f() {
    return this.form.controls;
  }

}
