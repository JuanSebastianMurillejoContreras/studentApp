import { Routes } from '@angular/router';
import { StudentEditComponent } from './student/student-edit/student-edit.component';
import { StudentComponent } from './student/student.component';
import { NotesComponent } from './notes/notes.component';
import { NotesEditComponent } from './notes/notes-edit/notes-edit.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherEditComponent } from './teacher/teachers-edit/teacher-edit.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectEditComponent } from './subject/subject-edit/subject-edit.component';
import { CourseComponent } from './course/course.component';
import { CourseEditComponent } from './course/course-edit/course-edit.component';
import { QualificationComponent } from './qualification/qualification.component';
import { QualificationEditComponent } from './qualification/qualification-edit/qualification-edit.component';


export const PagesRoutes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: 'new',
        component: StudentEditComponent,
      },
      {
        path: 'edit/:id',
        component: StudentEditComponent,
      },
    ],
  },  
  {
    path: 'teacher',
    component: TeacherComponent,
    children: [
      {
        path: 'new',
        component: TeacherEditComponent,        
      },
      {
        path: 'edit/:id',
        component: TeacherEditComponent,
      },
    ],
  },  
  {
    path: 'course',
    component: CourseComponent,
    children: [
      {
        path: 'new',
        component: CourseEditComponent,        
      },
      {
        path: 'edit/:id',
        component: CourseEditComponent,
      },
    ],
  },  
  {
    path: 'qualification',
    component: QualificationComponent,
    children: [
      {
        path: 'new',
        component: QualificationEditComponent,        
      },
      {
        path: 'edit/:id',
        component: QualificationEditComponent, 
      },
    ],
  },  
  {
    path: 'subject',
    component: SubjectComponent,
    children: [
      {
        path: 'new',
        component: SubjectEditComponent,        
      },
      {
        path: 'edit/:id',
        component: SubjectEditComponent,
      },
    ],
  },  
  {
    path: 'notes',
    component: NotesComponent,
    children: [
      {
        path: 'new',
        component: NotesEditComponent,
      },
      {
        path: 'edit/:id',
        component: NotesEditComponent,
      },
    ],
  }
  


]