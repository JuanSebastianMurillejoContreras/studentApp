import { Component, OnInit, ViewChild } from '@angular/core';  
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/service/teacher.service';


@Component({
  selector: 'app-student',
  standalone: true, 
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  imports: [MaterialModule, RouterLink, NgFor, RouterOutlet]
})
export class TeacherComponent implements OnInit{

  displayedColumns: string[] = ['idTeacher',  'dni', 'fistName', 'lastName', 'gender', 'age','birthDate', 'actions'];
  
  dataSource: MatTableDataSource<Teacher>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private teacherService: TeacherService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    
    this.teacherService.getTeacherChange().subscribe(data => {
      this.createTable(data);
  
    });

    this.teacherService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, "INFO", {duration: 2000, horizontalPosition:'right',   verticalPosition: 'top'});
    })

      this.teacherService.findAll().subscribe(data => {
       return this.createTable(data);
      });        
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Teacher[]){
    this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
  }
  
  delete( idTeacher: number ) {
    this.teacherService.delete(idTeacher)
    .pipe(switchMap(() => this.teacherService.findAll()))
    .subscribe(data => {      
      this.createTable(data);  
      this.teacherService.setMessageChange('DELETED!');
    })    
  }
}


    


