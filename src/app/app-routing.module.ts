import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTemplateAdminComponent } from './all-template-admin/all-template-admin.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllTemplateUserComponent } from './all-template-user/all-template-user.component';
import { UdpateCourseComponent } from './udpate-course/udpate-course.component';

const routes: Routes = [
  {
    path:'admin',
    component:AllTemplateAdminComponent,
    children:[
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'addNewCourse',
        component:AddCourseComponent
      },
      {
        path:'updateCourse',
        component:UdpateCourseComponent
      }
    ]
  },
  {
    path:'user',
    component:AllTemplateUserComponent,
    children:[
      {
        path:'homePage',
        component:HomePageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
