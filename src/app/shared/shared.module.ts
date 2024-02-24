import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarNotificationComponent } from './components/ui/snackbar-notification/snackbar-notification.component';
import {ImageLoadErrorDirective} from "./directives/image-load-error.directive";

@NgModule({
  declarations: [
    SnackbarNotificationComponent,
    ImageLoadErrorDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    SnackbarNotificationComponent,
    ImageLoadErrorDirective,
  ],
  providers: []
})
export class SharedModule {
}
