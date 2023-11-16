import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends GenericService<Student, number>{

  private studentChange: Subject<Student[]> = new Subject<Student[]>();
  private messageChange: Subject<string> = new Subject<string>();
  
  constructor(protected http: HttpClient){
    super(http, `${environment.HOST}/students`);
  }

  getStudentChange(){
    return this.studentChange.asObservable();
  }

  setStudentChange(data: Student[]){
    this.studentChange.next(data);
  }


  getMessageChange(){
  return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
