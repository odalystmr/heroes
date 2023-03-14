import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroesService } from 'src/app/core/services/heroes/heroes.service';
import { Heroe, Publisher } from 'src/app/interfaces/heroe.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar, private dialog: MatDialog) { }

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  publishers = [
    {
      id: Publisher.DCComics
    },
    {
      id: Publisher.MarvelComics
    }
  ]

  ngOnInit(): void {

    if(!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroesById(id))
    ).subscribe(response => this.heroe = response)

  }

  save() {

    if(this.heroe.superhero.trim().length == 0 || this.heroe.alter_ego.trim().length == 0 || this.heroe.characters.trim().length == 0 ||
      this.heroe.first_appearance.trim().length == 0)
      return;

    if(this.heroe.id) {
      this.heroesService.editHeroe(this.heroe).subscribe({
        next: (response) => {
          this.showSnackBar(`'${this.heroe.superhero}' actualizado correctamente`);
        }
      })
    } else {
      this.heroesService.addHeroe(this.heroe).subscribe({
        next: (response) => {
          this.router.navigate(['/heroes/edit', response.id]);
          this.showSnackBar(`'${this.heroe.superhero}' añadido correctamente`);
        }
      })
    }

  }

  delete() {

    const dialog = this.dialog.open(
      DialogComponent,
      {
        data: this.heroe
      }
    )

    dialog.afterClosed().subscribe(
      (result) => {
        if(result) {
          this.heroesService.deleteHeroe(this.heroe.id!).subscribe({
            next: (response) => {
              this.router.navigate(['/heroes']);
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
