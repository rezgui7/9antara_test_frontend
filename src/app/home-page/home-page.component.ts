import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  courseList1: any;
  constructor(private http:ServiceService){}
  ngOnInit(): void {
    this.http.getAllCourses().subscribe(data => {
      this.courseList1 = data;
      console.log(data)
      
    });  }
  getAllCourses() {
    this.http.getAllCourses();
      
  }

}
