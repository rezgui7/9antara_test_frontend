import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  templateUrl: './confirm-dialog-component.component.html',
  styleUrls: ['./confirm-dialog-component.component.css']
})
  export class ConfirmDialogComponentComponent {
    constructor(
      public dialogRef: MatDialogRef<ConfirmDialogComponentComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    onConfirm(): void {
      this.dialogRef.close(true);
    }
  
    onCancel(): void {
      this.dialogRef.close(false);
    }
  }