import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent {
  constructor(private r:Router){}

  addProject(){
    this.r.navigate(['admin/addNewCourse']);
  }
  view(){
    this.r.navigate(['admin/dashboard']);
  }
}
