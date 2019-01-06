import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from './../../interfaces/heroe.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    name: '',
    house: 'Marvel',
    bio: ''
  };

  new: false;
  id: string;

  constructor(private _heroeService: HeroesService,
    private _router: Router, private _activetedRoute: ActivatedRoute) {
      this._activetedRoute.params.subscribe(params => {
        this.id = params['id'];

        if (this.id !== 'nuevo') {
          this._heroeService.get(this.id).subscribe(heroe => this.heroe = heroe);
        }
      });
    }

  ngOnInit() {
  }

  add(form: NgForm) {
    this._router.navigate(['/heroe', 'nuevo']);
    form.reset({
      house: 'Marvel'
    });
  }

  save() {
    if (this.id === 'nuevo') {
      // Insertar
      this._heroeService.store(this.heroe)
        .subscribe(heroe => {
          console.log(heroe);
          this._router.navigate(['/heroe', heroe.name]);
        }, error => console.error(error));
    } else {
      // Actualización
      this._heroeService.update(this.heroe, this.id)
        .subscribe(heroe => {
          console.log(heroe);
        }, error => console.error(error));
    }
  }

}
