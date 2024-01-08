import { Component, OnInit } from '@angular/core';
import { Course } from 'src/_model/courses.module';
import { ServiceService } from '../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from 'src/_model/file-handle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Course2 } from 'src/_model/Courses2.module';

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

  img:FileHandle={
    file:new File(["file content"], "example.txt", { type: "text/plain" }),
    url:"any"
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
    this.course = this.mapDataToCourse(data);
    console.log(this.course);

  }, error => console.log(error));
  
  }
  updateCourse(courseForm : NgForm){
    const courseFormData = this.prepareFormData(this.course);
    courseForm.reset();

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
  prepareFormData(course:any): FormData{
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
  private mapDataToCourse(data: any): Course {
    // Adaptation des données avant de les assigner au modèle Course
    const images: FileHandle[] = data.images.map((image: any) => {
      return {
        file: new File([image.imageData], image.name, { type: image.type }),
        url: this.sanitizer.bypassSecurityTrustUrl(`data:${image.type};base64,${image.imageData}`)
      };
    });
  
    return {
      idCourses: data.idCourses,
      courseName: data.courseName,
      discription: data.discription,
      price: data.price,
      images: images
    };
  }

}
