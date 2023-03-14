import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from 'src/app/core/services/heroes/heroes.service';
import { Heroe } from 'src/app/interfaces/heroe.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private heroesService: HeroesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  @Input()
  heroe!: Heroe;
  @Input()
  childComponent!: boolean;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
      this.heroesService.getHeroesById(id).subscribe({
        next: (response) => {
          this.heroe = response;
        }
      })
    })
  }

  back() {
    this.router.navigate(['/heroes/list']);
  }

}
