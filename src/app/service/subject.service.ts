import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { AcademicSubject } from '../model/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends GenericService<AcademicSubject, number>{

  private subjectChange: Subject<AcademicSubject[]> = new Subject<AcademicSubject[]>();
  private messageChange: Subject<string> = new Subject<string>();
  
  constructor(protected http: HttpClient){
    super(http, `${environment.HOST}/subjects`);
  }

  getSubjectChange(){
    return this.subjectChange.asObservable();
  }

  setSubjectChange(data: AcademicSubject[]){
    this.subjectChange.next(data);
  }


  getMessageChange(){
  return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
