import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-notification',
  templateUrl: './snackbar-notification.component.html',
  styleUrls: ['./snackbar-notification.component.scss']
})
export class SnackbarNotificationComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: string
  ) { }

  ngOnInit(): void {

  }

}
