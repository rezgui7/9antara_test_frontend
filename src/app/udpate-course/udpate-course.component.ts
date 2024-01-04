import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_model/courses.module';
import { ServiceService } from '../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from 'src/_model/file-handle.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-udpate-course',
  templateUrl: './udpate-course.component.html',
  styleUrls: ['./udpate-course.component.css']
})
export class UdpateCourseComponent implements OnInit {
  id:any;

  course:Course={
    idCourses:0,
    courseName:"",
    discription:"",
    price:0,
    images: []

  }

  constructor(      private route:ActivatedRoute,
    private router:Router,
    private http:ServiceService ,private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
   console.log(this.id);
   this.http.getCourseById(this.id)
   .subscribe(data =>{
   

    console.log(data);
    

    this.course=data;
    
  }, error => console.log(error));
  
  }
  updateCourse(courseForm : NgForm){
    const courseFormData = this.prepareFormData(this.course);
    
        this.course.images=[];
    this.http.updateC(courseFormData).subscribe(
      (res:Course)=>{
        
        console.log(res);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    console.log(this.course);
    
  }
  
goToCourseList(){
 this.router.navigate(['admin/dashboard']);
}



  delete(id:any){
    this.http.deleteCourse(id).subscribe(data=>console.log(data));
    location.reload();
  }
  prepareFormData(course:Course): FormData{
    const formData =new FormData();
    formData.append(
      'course',
      new Blob([JSON.stringify(course)],{type: 'application/json'})
    );

    for (var i= 0;i<course.images.length;i++){
      formData.append(
        'file', 
        course.images[i].file,
        course.images[i].file.name
      );
    }
    return formData;
  }

  onFileSelected(event:any){
    console.log(event);
    if(event.target.files){
      const file=event.target.files[0];
      const fileHandle:FileHandle ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.course.images.push(fileHandle);
    }
  }
  removeImages(i:number){
    this.course.images.splice(i,1);
  }
  fileDropped(fileHandle: any) {
    this.course.images.push(fileHandle);
  }
  clear(projectForm:NgForm){
    projectForm.reset();
  }

}
