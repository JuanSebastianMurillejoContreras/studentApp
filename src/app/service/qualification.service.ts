import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';
import { Student } from '../model/student';
import { Teacher } from '../model/teacher';
import { AcademicSubject } from '../model/subject';
import { Qualification } from '../model/qualification';

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends GenericService<Qualification, number>{

  private subjectChange: Subject<Qualification[]> = new Subject<Qualification[]>();
  private messageChange: Subject<string> = new Subject<string>();
  
  constructor(protected http: HttpClient){
    super(http, `${environment.HOST}/qualifications`);
  }

  getQualificationsChange(){
    return this.subjectChange.asObservable();
  }

  setQualificationsChange(data: Qualification[]){
    this.subjectChange.next(data);
  }


  getMessageChange(){
  return this.messageChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

}
