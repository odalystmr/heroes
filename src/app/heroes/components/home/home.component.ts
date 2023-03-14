import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/users/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string ='';

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    this.userService.getUsersByQuery(token).subscribe(response => this.name = response[0].usuario);
  }

  logOut() {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login');
  }
}
