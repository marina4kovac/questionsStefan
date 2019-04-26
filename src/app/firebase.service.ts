import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Pitanje } from './pitanje';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(public db: AngularFirestore) { }

  dodajPitanje(pitanje: Pitanje) {
    this.db.collection<Counter>("broj").ref.doc("broj").update("cnt", firebase.firestore.FieldValue.increment(1));
    return this.db.collection<Question>('pitanja').add(
      { pitanje: JSON.stringify(pitanje) }
    );
  }

  pitanja() {
    return this.db.collection<Question>("pitanja").valueChanges();
  }

  dohvatiBroj(){
    return this.db.collection("broj").doc<Counter>("broj").valueChanges();
  }

}

export interface Question {
  pitanje: string;
}

export interface Counter {
  cnt: number;
}