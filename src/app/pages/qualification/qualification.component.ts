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
import { Qualification } from 'src/app/model/qualification';
import { QualificationService } from 'src/app/service/qualification.service';


@Component({
  selector: 'app-student',
  standalone: true, 
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
  imports: [MaterialModule, RouterLink, NgFor, RouterOutlet]
})
export class QualificationComponent implements OnInit{

  displayedColumns: string[] = ['idQualification',  'student', 'teacher', 'subject', 'note', 'actions'];
  
  dataSource: MatTableDataSource<Qualification>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private qualificationService: QualificationService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    
    this.qualificationService.getQualificationsChange().subscribe(data => {
      this.createTable(data);
  
    });

    this.qualificationService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, "INFO", {duration: 2000, horizontalPosition:'right',   verticalPosition: 'top'});
    })

      this.qualificationService.findAll().subscribe(data => {
       return this.createTable(data);
      });        
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Qualification[]){
    this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
  }
  
  delete( idSubject: number ) {
    this.qualificationService.delete(idSubject)
    .pipe(switchMap(() => this.qualificationService.findAll()))
    .subscribe(data => {      
      this.createTable(data);  
      this.qualificationService.setMessageChange('DELETED!');
    })    
  }
}


    


