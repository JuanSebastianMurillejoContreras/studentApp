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
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { QualificationService } from 'src/app/service/qualification.service';
import { Qualification } from 'src/app/model/qualification';

@Component( {
  standalone: true,
  selector: 'app-student-edit',
  templateUrl: './qualification-edit.component.html',
  styleUrls: ['./qualification-edit.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgIf, NgFor, AsyncPipe, RouterLink]
} )
export class QualificationEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  students: Student[];
  teachers: Teacher[];
  subjects: AcademicSubject[];
  

  teacherSelected: Teacher;
  studentSelected: Student;
  academicSubjectSelected: AcademicSubject;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private _snackBar: MatSnackBar,
    private qualificationService: QualificationService,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private subjectService: SubjectService
    
    
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup( {
      idQualification: new FormControl( 0 ),
      student: new FormControl( '', [Validators.required]),
      teacher: new FormControl( '', [Validators.required]),
      subject: new FormControl( '', [Validators.required]),
      note: new FormControl( '', [Validators.required, Validators.min(1), Validators.max(100)]),
              
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
      this.qualificationService.findById(this.id).subscribe( data => {
        this.form = new FormGroup( {
          idQualification: new FormControl( data.idQualification ),
          student: new FormControl( data.student, [Validators.required]),
          teacher: new FormControl( data.teacher, [Validators.required]),
          subject: new FormControl( data.subject, [Validators.required]),
          note: new FormControl( '', [Validators.required, Validators.min(1), Validators.max(100)]),
                      
        } );
      } );
    }
  }

  loadInitialData() {
    this.studentService.findAll().subscribe(data => this.students = data);   
    this.teacherService.findAll().subscribe(data => this.teachers = data);   
    this.subjectService.findAll().subscribe(data => this.subjects = data);   
            
  }

  selectStudent(student : Student){
    this.studentSelected = student;
  }

  selectTeacher(teacher : Teacher){
    this.teacherSelected = teacher;
  }

  selectSubject(subject : Teacher){
    this.teacherSelected = subject;
  }



  operate() {
    if ( this.form.invalid ) {
      this._snackBar.open( 'Form is invalid', 'INFO', { duration: 2000 } );
      return;
    }
    const qualification: Qualification = new Qualification();
    qualification.idQualification = this.form.value['idQualification'];
    qualification.student = this.form.value['student'];
    qualification.teacher = this.form.value['teacher'];
    qualification.subject = this.form.value['subject'];
    qualification.note = this.form.value['note'];
    console.log('idQualification:', this.form.value['idQualification']);
 

    if ( this.isEdit ) {      
      this.qualificationService.update( this.id, qualification ).subscribe( () => {
        this.qualificationService.findAll().subscribe( data => {
          this.qualificationService.setQualificationsChange( data );
          this.qualificationService.setMessageChange( 'UPDATED!' )
        } )
      } );
    } else {
      this.qualificationService.save( qualification ).pipe( switchMap( () => {
        return this.qualificationService.findAll();
      } ) )
        .subscribe( data => {
          this.qualificationService.setQualificationsChange( data );
          this.qualificationService.setMessageChange( 'CREATED!' )
        } );
    }

    this.router.navigate(['/pages/qualification']);
  }


  get f() {
    return this.form.controls;
  }

}
