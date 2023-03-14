import {Component, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user.interface";
import {UserService} from "../../../core/services/users/user.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User = {
    usuario: '',
    email: '',
    password: '',
    token: ''
  }

  constructor(private userService: UserService, private cookieService: CookieService, private router:Router) {
  }

  ngOnInit(): void {
  }

  login() {

    const token = btoa(this.user.usuario + ':' + this.user.password);

    this.userService.getUsersByQuery(token).subscribe({
        next: response => {
         if(response.length===1){
           this.cookieService.set('token',token, {path: '/'});
           this.router.navigateByUrl('/heroes');
         }
        //  y si no es 1, es porque no hay usuario registrado con ese token (usuario y contraseña) o porque hay usuarios duplicados
        }
      }
    );


  }

}
