import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/core/services/heroes/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  heroes!: Heroe[];

  ngOnInit(): void {

    this.heroesService.getHeroes().subscribe({
      next:(response) => {
        this.heroes = response;
      }
    })

  }

}
