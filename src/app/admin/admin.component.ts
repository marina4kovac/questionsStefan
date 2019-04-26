import { Component, OnInit, Input } from '@angular/core';
import { Pitanje } from '../pitanje';
import { Potpitanje } from '../potpitanje';
import { FirebaseService, Question } from '../firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentChangeAction } from 'angularfire2/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Input('password') password:string;

  pitanja: any[];
  pitanjaName = "pitanja";

  pitanje: Pitanje;
  greska = "Obavezno polje!";
  greskaBroj = "Nedozvoljen broj potpitanja!";
  passVal = "ADMIN";


  constructor(private firebaseService:FirebaseService, private ruta:ActivatedRoute, private ruter:Router) { }

  ngOnInit() {
    const password = this.ruta.snapshot.paramMap.get("p");
    this.password = password;

    if(this.password!=this.passVal)
      this.ruter.navigate(['']);

    this.firebaseService.dokumenti().subscribe(result =>
      this.pitanja=result
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
    this.pitanje.odgovoreno = false;
    this.firebaseService.dodajPitanje(this.pitanje);
    this.pitanje = new Pitanje();
    this.pitanje.potpitanja = [];
  }

  tekst(q : DocumentChangeAction<{}>) : string
  {
    var pit : Pitanje = JSON.parse((q.payload.doc.data() as Question).pitanje);
    return pit.tekst;
  }

  potpitanja(q : DocumentChangeAction<{}>) : Potpitanje[]
  {
    var pit : Pitanje = JSON.parse((q.payload.doc.data() as Question).pitanje);
    return pit.potpitanja;
  }

  odgovoreno(q : DocumentChangeAction<{}>) : boolean
  {
    var pit : Pitanje = JSON.parse((q.payload.doc.data() as Question).pitanje);
    return pit.odgovoreno;
  }

  skloniOdgovoreno(q : DocumentChangeAction<{}>){
    this.firebaseService.skloniOdgovoreno(JSON.parse((q.payload.doc.data() as Question).pitanje), q.payload.doc.id);
  }
  
  obrisiPitanje(q : DocumentChangeAction<{}>){
    this.firebaseService.obrisiPitanje(q.payload.doc.id);
  }


}
