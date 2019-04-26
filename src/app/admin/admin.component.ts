import { Component, OnInit } from '@angular/core';
import { Pitanje } from '../pitanje';
import { Potpitanje } from '../potpitanje';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  pitanja: Pitanje[];
  pitanjaName = "pitanja";

  pitanje: Pitanje;
  greska = "Obavezno polje!";
  greskaBroj = "Nedozvoljen broj potpitanja!";

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.pitanja().subscribe(result =>
      {this.pitanja = [];
        result.forEach(p=>this.pitanja.push(JSON.parse(p.pitanje)));}
    );
    this.pitanje = new Pitanje();
    this.pitanje.potpitanja = [];
  }

  dodajOdgovore() {
    if (!this.pitanje.brPitanja || this.pitanje.brPitanja <= 0) 
      this.pitanje.potpitanja = [];
    else{
      this.pitanje.potpitanja = Array<Potpitanje>(this.pitanje.brPitanja);
      for( let i=0;i<this.pitanje.brPitanja;i++)
        this.pitanje.potpitanja[i] = new Potpitanje();
    }
  }

  slovo(n: number): string {
    return String.fromCharCode(n + "a".charCodeAt(0));
  }

  dodajPitanje(){
    this.firebaseService.dodajPitanje(this.pitanje);
    this.pitanje = new Pitanje();
    this.pitanje.potpitanja = [];
  }

}
