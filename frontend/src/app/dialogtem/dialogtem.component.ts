import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialogtem',
  templateUrl: './dialogtem.component.html',
  styleUrls: ['./dialogtem.component.scss']
})
export class DialogtemComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
