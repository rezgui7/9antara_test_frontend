import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponentComponent } from '../confirm-dialog-component/confirm-dialog-component.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild  (MatSort) sort!: MatSort; // Add this line to access the MatSort directive

  displayedColumns: string[] = [
    'idCourses',
    'courseName',
    'discription',
    'price',
    'actions'
  ];
  courseList:any;
  searchText:any;
  courseList1: any[] = []; 
  dataSource = new MatTableDataSource<any>(this.courseList1);
  dataSource2 = new MatTableDataSource<any>(this.courseList1);

  constructor(private r:Router, private http:ServiceService,public dialog: MatDialog){}

  ngOnInit(): void {
  // Set the MatSort to your data source
  this.dataSource.sort = this.sort;

  // Apply custom filter function
  this.dataSource.filterPredicate = (data, filter) => {
    const searchString = filter.trim().toLowerCase();
    const courseName = data.courseName.toLowerCase();
    const price = data.price.toLowerCase();

    // Check if the filter string is present in either the "start_date" or "client" column
    return courseName.includes(searchString) || price.includes(searchString);
  };

    this.http.getAllCourses().subscribe(data => {
      this.courseList1 = data;
      console.log(data)
      this.dataSource.data = this.courseList1;
      console.log(this.dataSource.data);
      // Update the table's data source
    });
    

    
  }
  

  UpdateCourse(id:any){
    this.r.navigate(['/admin/updateCourse',{id:id}]);
  }
  
  delete2(id:any){
    this.http.deleteCourse(id).subscribe(data=>console.log(data));
    location.reload();
  }
  delete(id: any): void {
    this.http.deleteCourse(id).subscribe(
      data => {
        console.log('Course deleted successfully:', data);
        location.reload();
      },
      error => {
        console.error('Error deleting course:', error);
      }
    );
  }
  
  
  applycourseNameFilter(filterValue: string) {
    if (filterValue != null) {
      this.applyFilter(filterValue, 'courseName');
    }
  }
  
  applypriceFilter(filterValue: string) {
    if (filterValue != null) {
      this.applyFilter(filterValue, 'price');
    }
  }
  
  applyFilter(filterValue: string, column: string) {
    if (filterValue != null) {
      // Your existing filter logic here
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    
}
openDeleteConfirmationDialog(id: any): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponentComponent, {
    width: '350px',
    data: {
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
    },
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed delete, perform delete operation
      this.delete(id);
    }
    // If result is false, user canceled delete (do nothing in that case)
  });
}

}