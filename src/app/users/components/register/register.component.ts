import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/interfaces/user.interface';
import {DialogComponent} from "../../../heroes/components/dialog/dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../core/services/users/user.service";
import {switchMap} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    usuario: '',
    email: '',
    password: '',
    token: ''
  }

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router,
              private snackBar: MatSnackBar, private dialog: MatDialog, private cookieService: CookieService) {
  }

  ngOnInit(): void {

      if(!this.router.url.includes('profile')) {
        return;
    }

    const token = this.cookieService.get('token');

    this.activatedRoute.params.pipe(
      switchMap(() => this.userService.getUsersByQuery(token))
    ).subscribe(response => this.user = response[0])

  }

  save() {
    if (this.user.usuario.trim().length == 0 || this.user.email.trim().length == 0 || this.user.password.trim().length == 0) {
      return;
    }
    this.user.token = btoa(this.user.usuario + ':' + this.user.password);

    if (this.user.id) {
      this.userService.editUser(this.user).subscribe({
        next: (response) => {
          this.showSnackBar(`'${this.user.usuario}' actualizado correctamente`);
        }
      })
    } else {
      this.userService.addUser(this.user).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/login')
          this.showSnackBar(`'${this.user.usuario}' añadido correctamente`);
        }
      })
    }

  }

  delete() {
    const dialog = this.dialog.open(DialogComponent, {data: this.user})

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.userService.deleteUser(this.user.id!).subscribe({
            next: (response) => {
              this.router.navigateByUrl('/login');
            }
          })
        }
      }
    )

  }

  showSnackBar(msg: string) {
    this.snackBar.open(
      msg,
      'Aceptar',
      {
        duration: 3000
      }
    )
  }
}
