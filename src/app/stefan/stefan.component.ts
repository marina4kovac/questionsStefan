import { Component, OnInit } from '@angular/core';
import { Pitanje } from '../pitanje';
import { Router } from '@angular/router';
import { FirebaseService, Question } from '../firebase.service';

@Component({
  selector: 'app-stefan',
  templateUrl: './stefan.component.html',
  styleUrls: ['./stefan.component.css']
})
export class StefanComponent implements OnInit {


  password: string;
  passVal = "ADMIN";

  pitanja: Pitanje[];
  pitanje: Pitanje;

  odgovori: number[];
  postavljeno: boolean;

  No: number;
  pitIDs: string[];
  pitID: number;

  constructor(private ruter: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.pitanja = [];
    this.pitIDs = [];
    this.pitanje = { tekst: "Slobodan dan!", brPitanja: 0, potpitanja: [], odgovoreno:false };
    this.odgovori = [];
    this.postavljeno = false;
    this.password = "";
    this.No = 0;

    this.firebaseService.dokumenti().subscribe(result=>{
      if(!this.postavljeno || this.pitanja.length==0){
        this.postavljeno=true;
        this.pitIDs = result.map(ch => ch.payload.doc.id);
        this.pitanja = result.map(ch => JSON.parse((ch.payload.doc.data() as Question).pitanje));
        this.filtriraj();
        this.postaviPitanje();
      }
  });

  }

  filtriraj() {
    for(let i=0;i<this.pitanja.length;i++)
    {
      if(this.pitanja[i].odgovoreno==true)
        this.pitIDs = this.pitIDs.filter(v => v!=this.pitIDs[i]);
    }
    this.pitanja = this.pitanja.filter(v => v.odgovoreno==false);
  }

  postaviPitanje() {
    if (this.pitanja.length > 0) {
      var n: number = Math.floor(Math.random() * this.pitanja.length);
      this.pitanje = this.pitanja[n];
      this.odgovori = Array<number>(this.pitanje.brPitanja);
      this.pitID = n;
    }
    else {
      this.pitanje = { tekst: "Slobodan dan!", brPitanja: 0, potpitanja: [], odgovoreno: false};
      this.odgovori = [];
    }

  }

  slovo(n: number): string {
    return String.fromCharCode(n + "a".charCodeAt(0));
  }

  potvrdi(): boolean {
    var tacno = true;
    for (let i = 0; i < this.pitanje.brPitanja; i++) {
      if (this.pitanje.potpitanja[i].odgovor != this.odgovori[i])
        return false;
    }
    return tacno;
  }

  continue() {
    if (this.potvrdi()) {
      alert("Bravo!");
      if (this.pitanje.brPitanja != 0) {
        console.log(this.pitanje);
        console.log(this.pitID);
        this.firebaseService.odgovoreno(this.pitanje, this.pitIDs[this.pitID]);
        this.No++;
        this.pitanja = this.pitanja.filter(p => p != this.pitanja[this.pitID]);
        this.pitIDs = this.pitIDs.filter(p => p != this.pitIDs[this.pitID]);

        if (this.No < 5)
          this.postaviPitanje();
        else {
          this.pitanje = { tekst: "Slobodan dan!", brPitanja: 0, potpitanja: [], odgovoreno : false };
          this.odgovori = [];
        }
      }
    }
    else
      alert("Netacno!");
  }

  gotoAdmin() {
    if (this.password != this.passVal)
      alert("WRONG PASSWORD!");
    else
      this.ruter.navigate(["admin", this.password]);
  }

}
