import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { map } from 'rxjs';
import { Course } from 'src/_model/courses.module';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProcessingImageService } from '../services/processing-image-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  courseList1: any;
  constructor(private route: ActivatedRoute,
    private http:ServiceService,
    private processingImageService:ProcessingImageService,
    private sanitizer: DomSanitizer,
    private r: Router){}
  ngOnInit(): void {
    this.getAllCourses();
  }
  

  public getAllCourses(){
    this.http.getAllCourses()
    .pipe(
      map(
        (x:Course[],i)=> x.map(
          (course:Course)=>this.processingImageService.createImage(course)
        )
      )
    )
    .subscribe(
      (resp:Course[]) => {
        //console.log(resp);
        //console.log(resp.length);
        //console.log(this.showLoadButton);
        this.courseList1=resp;
      }
      );
      
    
  }

}
