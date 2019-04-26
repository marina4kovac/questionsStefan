import { Component, OnInit } from '@angular/core';
import { Pitanje } from '../pitanje';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-stefan',
  templateUrl: './stefan.component.html',
  styleUrls: ['./stefan.component.css']
})
export class StefanComponent implements OnInit {

  pitanja: Pitanje[];
  pitanje: Pitanje;
  pitanjaName = "pitanja";
  odgovori: number[];
  postavljeno : boolean;

  constructor(private ruter: Router, private firebaseService: FirebaseService) { }

    ngOnInit() {
    this.pitanje = { tekst: "Slobodan dan!", brPitanja: 0, potpitanja: [] };
    this.pitanje = new Pitanje();
    this.pitanje.potpitanja = [];
    this.postavljeno = false;

    this.firebaseService.pitanja().subscribe(result => {
    this.pitanja = [];
      result.forEach(p => this.pitanja.push(JSON.parse(p.pitanje)));
    }
    );
    this.firebaseService.dohvatiBroj().subscribe(result=>{
      if(!this.postavljeno){
      this.postavljeno=true;
      const cnt = result.cnt;
      var n: number = Math.floor(Math.random() * cnt);
      this.pitanje = this.pitanja[n];
      this.odgovori = Array<number>(this.pitanje.brPitanja);
      }
    });
    
  }

  slovo(n: number): string {
    return String.fromCharCode(n + "a".charCodeAt(0));
  }

  potvrdi(): boolean {
    var tacno = true;
    for (let i = 0; i < this.pitanje.brPitanja; i++){
     if(this.pitanje.potpitanja[i].odgovor != this.odgovori[i])
        return false;
    }
      return tacno;
  }

  continue() {
    if(this.potvrdi()){
      alert("Bravo!");
      this.ngOnInit();
    }
    else 
      alert("Netacno!");
  }

  gotoAdmin() {
    alert("HERE");
    this.ruter.navigate(["admin"]);
  }

}
