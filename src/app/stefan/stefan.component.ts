import { Component, OnInit } from '@angular/core';
import { Pitanje } from '../pitanje';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stefan',
  templateUrl: './stefan.component.html',
  styleUrls: ['./stefan.component.css']
})
export class StefanComponent implements OnInit {

  pitanje: Pitanje;
  pitanjaName = "pitanja";
  odgovori: number[];

  constructor(private ruter:Router) { }

  ngOnInit() {
    var pitanja = JSON.parse(localStorage.getItem(this.pitanjaName));
    if (pitanja == null || pitanja.length == 0)
      this.pitanje = { tekst: "Slobodan dan!", brPitanja: 0, potpitanja: [] };
    else {
      var n: number = Math.floor(Math.random() * pitanja.length);
      this.pitanje = pitanja[n];
      this.odgovori = Array<number>(this.pitanje.potpitanja.length);
    }
  }

  slovo(n: number): string {
    return String.fromCharCode(n + "a".charCodeAt(0));
  }

  potvrdi(): boolean {
    for (let i = 0; i < this.pitanje.potpitanja.length; i++)
      if (this.pitanje.potpitanja[i].odgovor != this.odgovori[i])
        return false;
    return true;
  }

  continue(){
    alert("Bravo!");
  }

  gotoAdmin(){
    alert("HERE");
    this.ruter.navigate(["admin"]);
  }

}
