import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroesService } from 'src/app/core/services/heroes/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  txt: string = '';
  heroes: Heroe[] = [];
  selectedHeroe!: Heroe;
  childComponent: boolean = true;

  ngOnInit(): void {
  }

  search() {
    this.heroesService.getHeroesByQuery(this.txt.trim()).subscribe({
      next: (response) => {
        this.heroes = response;
      }
    })
  }

  checkSelectedOption(event: MatAutocompleteSelectedEvent) {

    if(!event.option.value) {
      this.txt = '';
      return;
    }

    this.selectedHeroe = event.option.value;
    this.txt = this.selectedHeroe.superhero;

  }

}
