import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pitanje } from './pitanje';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  skloniOdgovoreno(p: Pitanje, id: string) {
    p.odgovoreno=false;
    this.db.collection<Question>("pitanja").doc(id).update({ "pitanje": JSON.stringify(p)}).catch(err => {});
  }
  obrisiPitanje(id: string) {
    this.db.collection<Question>("pitanja").doc(id).delete().catch(err => {});
  }

  constructor(public db: AngularFirestore) { }

  dodajPitanje(pitanje: Pitanje) {
    return this.db.collection<Question>('pitanja').add(
      { pitanje: JSON.stringify(pitanje) }
    );
  }

  pitanja() {
    return this.db.collection<Question>("pitanja").valueChanges();
  }

  dokumenti() {
    return this.db.collection("pitanja").snapshotChanges();
  }

  odgovoreno(pitanje: Pitanje, id: string) {
    var newQ = pitanje;
    newQ.odgovoreno = true;
    console.log(JSON.stringify(pitanje) + "\n" + id);
    this.db.collection("pitanja").doc(id).update({ "pitanje": JSON.stringify(newQ) }).catch(err => {});
  }

}

export interface Question {
  pitanje: string;
}

export interface Counter {
  cnt: number;
}