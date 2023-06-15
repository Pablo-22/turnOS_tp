import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, docData, where, getDocs, setDoc, updateDoc, deleteDoc, query, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataEntity } from '../../models/dataEntity/data-entity';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private _firestore: Firestore) { }

  getAll(collectionName:string) {
    const EntityCollection = collection(this._firestore, collectionName)
    return collectionData(EntityCollection, {
      idField: 'id',
    }) as Observable<any[]>;
  }

  getById(collectionName:string, id:string) {
    const EntityCollection = collection(this._firestore, collectionName)
    return docData(doc(EntityCollection, id), {
      idField: 'id',
    }) as Observable<any>;
  }

  async getByField(collectionName:string, fieldName:string, value:any) {
    const EntityCollection = collection(this._firestore, collectionName)
    const q = query(EntityCollection, where(fieldName, "==", value));
    const querySnapshot = await getDocs(q);
    
    let documents:DocumentData[] = [];
    querySnapshot.docs.forEach(doc => {
      let docData = doc.data();
      documents.push(docData);
    })
    
    return documents;
  }

  create(collectionName:string, obj:DataEntity) {
    const EntityCollection = collection(this._firestore, collectionName)
    let newDocRef = doc(EntityCollection);
    obj.id = newDocRef.id;
    setDoc(newDocRef, JSON.parse(JSON.stringify(obj)) );

    return newDocRef.id;
  }

  update(collectionName:string, obj:DataEntity) {
    const EntityCollection = collection(this._firestore, collectionName)
    const documentReference = doc(EntityCollection, obj.id);
    updateDoc(documentReference, JSON.parse(JSON.stringify(obj)));
  }


  delete(collectionName:string, id:string) {
    const EntityCollection = collection(this._firestore, collectionName)
    const documentReference = doc(EntityCollection, id);
    deleteDoc(documentReference);
    return documentReference;
  }
}