import { Component, OnInit, ViewChild } from '@angular/core';  
import { StudentService } from 'src/app/service/student.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { AcademicSubject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/service/subject.service';


@Component({
  selector: 'app-student',
  standalone: true, 
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
  imports: [MaterialModule, RouterLink, NgFor, RouterOutlet]
})
export class SubjectComponent implements OnInit{

  displayedColumns: string[] = ['idSubject',  'codSubject', 'nameSubject', 'teacher', 'actions'];
  
  dataSource: MatTableDataSource<AcademicSubject>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private subjectService: SubjectService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    
    this.subjectService.getSubjectChange().subscribe(data => {
      this.createTable(data);
  
    });

    this.subjectService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, "INFO", {duration: 2000, horizontalPosition:'right',   verticalPosition: 'top'});
    })

      this.subjectService.findAll().subscribe(data => {
       return this.createTable(data);
      });        
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: AcademicSubject[]){
    this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
  }
  
  delete( idSubject: number ) {
    this.subjectService.delete(idSubject)
    .pipe(switchMap(() => this.subjectService.findAll()))
    .subscribe(data => {      
      this.createTable(data);  
      this.subjectService.setMessageChange('DELETED!');
    })    
  }
}


    


