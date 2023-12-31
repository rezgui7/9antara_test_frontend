import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_model/courses.module';
import { ServiceService } from '../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from 'src/_model/file-handle.model';
import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {

  course:Course={
    idCourses:0,
    courseName:"",
    discription:"",
    price:0,
    images: []

  }

  constructor(private http:ServiceService ,private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    
  }
  addCourse(courseForm : NgForm){
    const courseFormData = this.prepareFormData(this.course);
    courseForm.reset();

        this.course.images=[];
    this.http.addC(courseFormData).subscribe(
      (res:Course)=>{
        
        console.log(res);
      },
      (error: HttpErrorResponse)=>{
        console.log(error);
      }
    );
    console.log(this.course);
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
  fileDropped(fileHandle: any):void {
    this.course.images.push(fileHandle);
  }
  clear(projectForm:NgForm){
    projectForm.reset();
  }

}

