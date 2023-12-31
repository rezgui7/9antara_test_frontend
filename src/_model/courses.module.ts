import { FileHandle } from "./file-handle.model";

export interface Course {
    idCourses:number,
    courseName:string,
    discription:string,
    price:number,
    images: FileHandle[]


} 