import { Component, OnInit, ViewChild } from '@angular/core';  
import { NgFor } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { CourseService } from 'src/app/service/course.service';
import { Course } from 'src/app/model/course';


@Component({
  selector: 'app-student',
  standalone: true, 
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  imports: [MaterialModule, RouterLink, NgFor, RouterOutlet]
})
export class CourseComponent implements OnInit{

  displayedColumns: string[] = ['idCourse',  'numClassroom', 'courseManager', 'courseMonitor', 'actions'];
  
  dataSource: MatTableDataSource<Course>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private courseService: CourseService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    
    this.courseService.getCourseChange().subscribe(data => {
      this.createTable(data);
  
    });

    this.courseService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, "INFO", {duration: 2000, horizontalPosition:'right',   verticalPosition: 'top'});
    })

      this.courseService.findAll().subscribe(data => {
       return this.createTable(data);
      });        
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  createTable(data: Course[]){
    this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort; 
        this.dataSource.paginator = this.paginator;
  }
  
  delete( idCourse: number ) {
    this.courseService.delete(idCourse)
    .pipe(switchMap(() => this.courseService.findAll()))
    .subscribe(data => {      
      this.createTable(data);  
      this.courseService.setMessageChange('DELETED!');
    })    
  }
}


    


