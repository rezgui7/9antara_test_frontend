import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/_model/courses.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  userUrl="http://localhost:1124/bridge/courses/";

  constructor(private http:HttpClient) { }

  addCourse(t:Course){
    return this.http.post<Course>(this.userUrl+'addCourses' , t);
  }
  getAllCourses(){
    return this.http.get<Course[]>(this.userUrl+'displayCourses');
  }
  public getCourseById(id:any):Observable<Course>{
    return this.http.get<Course>(this.userUrl+'displayCourse'+`/${id}`);
  }
  updateCourse(p:Course): Observable<Object>{
    return this.http.put(this.userUrl+'updateCourses', p);
  }
  deleteCourse(id:number){
    return this.http.delete(this.userUrl+'deleteCourses'+`/${id}`);
  }
  addC(t:FormData){
    return this.http.post<Course>(this.userUrl+'addNewCourse' , t);
  }
}
