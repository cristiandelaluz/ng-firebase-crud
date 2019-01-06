import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any;
  loading = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getAll().subscribe(heroes => {
      console.log(heroes);
      setTimeout(() => {
        this.heroes = heroes;
        this.loading = false;
      }, 1000);
    });
  }

  ngOnInit() {
  }

  delete(key$: string) {
    this._heroesService.delete(key$).subscribe(response => {
      console.log(response);
      if (response) {
        console.error(response);
      } else {
        delete this.heroes[key$];
      }
    });
  }

}
