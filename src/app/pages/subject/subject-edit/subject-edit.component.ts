import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { AcademicSubject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/service/subject.service';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/service/teacher.service';

@Component( {
  standalone: true,
  selector: 'app-student-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe, RouterLink]
} )
export class SubjectEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  teachers: Teacher[];

  teacherSelected: Teacher;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private subjectService: SubjectService,
    private teacherService: TeacherService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      idSubject: new FormControl( 0 ),
      codSubject: new FormControl( '', [Validators.required]),
      nameSubject: new FormControl( '', [Validators.required, Validators.minLength(1), Validators.maxLength(35)]),
      teacher: new FormControl( '', [Validators.required])           
    } );

    this.route.params.subscribe( data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;      
      this.initForm();
      this.loadInitialData();      
    } )
  }

  initForm() {
    if ( this.isEdit ) {
      this.subjectService.findById(this.id).subscribe( data => {
        this.form = new FormGroup( {
          idSubject: new FormControl( data.idSubject ),
          codSubject: new FormControl( data.codSubject, [Validators.required]),
          nameSubject: new FormControl( data.nameSubject, [Validators.required, Validators.minLength( 1 ), Validators.maxLength(35)]),
          teacher: new FormControl( data.teacher, [Validators.required]),               
                        
        } );
      } );
    }
  }

  loadInitialData() {
    this.teacherService.findAll().subscribe(data => this.teachers = data);           
  }

  selectTeacher(t : Teacher){
    this.teacherSelected = t;
  }

  operate() {
    if ( this.form.invalid ) {
      this._snackBar.open( 'Form is invalid', 'INFO', { duration: 2000 } );
      return;
    }
    const subject: AcademicSubject = new AcademicSubject();
    subject.idSubject = this.form.value['idSubject'];
    subject.codSubject = this.form.value['codSubject'];
    subject.nameSubject = this.form.value['nameSubject'];
    subject.teacher = this.form.value['teacher'];

    console.log('idSubject:', this.form.value['idSubject']);

    if ( this.isEdit ) {
      
      this.subjectService.update( this.id, subject ).subscribe( () => {
        this.subjectService.findAll().subscribe( data => {
          this.subjectService.setSubjectChange( data );
          this.subjectService.setMessageChange( 'UPDATED!' )
        } )
      } );
    } else {
   
      this.subjectService.save( subject ).pipe( switchMap( () => {
        return this.subjectService.findAll();
      } ) )
        .subscribe( data => {
          this.subjectService.setSubjectChange( data );
          this.subjectService.setMessageChange( 'CREATED!' )
        } );
    }

    this.router.navigate(['/pages/subject']);
  }


  get f() {
    return this.form.controls;
  }

}
