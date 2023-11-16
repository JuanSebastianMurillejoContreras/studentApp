import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends GenericService<Teacher, number>{

  private teacherChange: Subject<Teacher[]> = new Subject<Teacher[]>();
  private messageChange: Subject<string> = new Subject<string>();
  
  constructor(protected http: HttpClient){
    super(http, `${environment.HOST}/teachers`);
  }

  getTeacherChange(){
    return this.teacherChange.asObservable();
  }

  setTeacherChange(data: Teacher[]){
    this.teacherChange.next(data);
  }


  getMessageChange(){
  return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
