import { Component, OnInit, ViewChild } from '@angular/core';  
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-student',
  standalone: true, 
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  imports: [MaterialModule, RouterLink, NgFor, RouterOutlet]
})
export class StudentComponent implements OnInit{

  displayedColumns: string[] = ['idStudent',  'dni', 'fistName', 'lastName', 'gender', 'age','birthDate', 'actions'];
  
  dataSource: MatTableDataSource<Student>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private studentService: StudentService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    
    this.studentService.getStudentChange().subscribe(data => {
      this.createTable(data);
  
    });

    this.studentService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, "INFO", {duration: 2000, horizontalPosition:'right',   verticalPosition: 'top'});
    })

      this.studentService.findAll().subscribe(data => {
       return this.createTable(data);
      });        
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Student[]){
    this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
  }
  
  delete( idStudent: number ) {
    this.studentService.delete(idStudent)
    .pipe(switchMap(() => this.studentService.findAll()))
    .subscribe(data => {      
      this.createTable(data);  
      this.studentService.setMessageChange('DELETED!');
    })    
  }
}


    


