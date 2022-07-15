import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter();
  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onToggleMenu(){
    this.toggleMenu.emit(null);
  }

  logout(){
    this.toggleMenu.emit(null);
    this.authService.logout();
  }
}
