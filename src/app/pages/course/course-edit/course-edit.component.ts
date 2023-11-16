import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { Course } from 'src/app/model/course';
import { Teacher } from 'src/app/model/teacher';
import { CourseService } from 'src/app/service/course.service';

@Component( {
  standalone: true,
  selector: 'app-teacher-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe, RouterLink]
} )
export class CourseEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private courseService: CourseService,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      idCourse: new FormControl( 0 ),
      numClassroom: new FormControl( '', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
      courseManager: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)]),
      courseMonitor: new FormControl( '', [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)] ),      
    } );

    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    } )
  }

  initForm() {
    if ( this.isEdit ) {
      this.courseService.findById( this.id ).subscribe( data => {
        this.form = new FormGroup( {
          idCourse: new FormControl( data.idCourse ),
          numClassroom: new FormControl( data.numClassroom, [Validators.required, Validators.minLength(1), Validators.maxLength(10)] ),
          courseManager: new FormControl( data.courseManager, [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)] ),
          courseMonitor: new FormControl( data.courseMonitor, [Validators.required, Validators.minLength( 2 ), Validators.maxLength(35)] )                
        } );
      } );
    }
  }

  operate() {
    if ( this.form.invalid ) {
      this._snackBar.open( 'Form is invalid', 'INFO', { duration: 2000 } );
      return;
    }
    const course: Course = new Course();
    course.idCourse = this.form.value['idCourse'];
    course.numClassroom = this.form.value['numClassroom'];
    course.courseManager = this.form.value['courseManager'];
    course.courseMonitor = this.form.value['courseMonitor'];  
  
    if ( this.isEdit ) {
      
      this.courseService.update( this.id, course ).subscribe( () => {
        this.courseService.findAll().subscribe( data => {
          this.courseService.setCourseChange( data );
          this.courseService.setMessageChange( 'UPDATED!' )
        } )
      } );
    } else {
   
      this.courseService.save( course ).pipe( switchMap( () => {
        return this.courseService.findAll();
      } ) )
        .subscribe( data => {
          this.courseService.setCourseChange( data );
          this.courseService.setMessageChange( 'CREATED!' )
        } );
    }

    this.router.navigate(['/pages/course']);
  }


  get f() {
    return this.form.controls;
  }

}
