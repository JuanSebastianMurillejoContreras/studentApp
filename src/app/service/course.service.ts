import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends GenericService<Course, number>{

  private teacherChange: Subject<Course[]> = new Subject<Course[]>();
  private messageChange: Subject<string> = new Subject<string>();
  
  constructor(protected http: HttpClient){
    super(http, `${environment.HOST}/courses`);
  }

  getCourseChange(){
    return this.teacherChange.asObservable();
  }

  setCourseChange(data: Course[]){
    this.teacherChange.next(data);
  }


  getMessageChange(){
  return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
