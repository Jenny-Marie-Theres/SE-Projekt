import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss']
})
export class AdminToolbarComponent {
  @Output() buttonClick = new EventEmitter<string>();
  constructor(private router: Router) { }

  emitButtonClick(buttonType: string) {
    this.buttonClick.emit(buttonType);
  }
  toHome(){
    this.router.navigateByUrl('admin');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('')
  }
}
