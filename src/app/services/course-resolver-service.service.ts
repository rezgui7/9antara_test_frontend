import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ServiceService } from './service.service';
import { ProcessingImageService } from './processing-image-service.service';
import { Course } from 'src/_model/courses.module';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverServiceService implements Resolve<Course>{

  constructor(private http: ServiceService,
    private imageProcessing:ProcessingImageService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course>  {
    const id = route.paramMap.get('id');
    console.log(id);
    if(id){
      console.log(id)
      return this.http.getCourseById(id)
      .pipe(
        map(p=>this.imageProcessing.createImage(p))
      );
    }
    else{
      return of(this.getCourseDetails());
    }
    
    
    
  }


  getCourseDetails(){
    return{
    idCourses:0,
    courseName:"null",
    discription:"null",
    price:0,
    images: [],
    }
  }
}
