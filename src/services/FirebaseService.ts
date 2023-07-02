import { DocumentData, DocumentReference, addDoc, collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Suggestion } from '../types/Suggestion.type';
import { RatingType } from '../types/Rating.type';
import { Framework } from '../types/Framework.type';

export class FirebaseService {

  public static saveSuggestions(suggestion: Suggestion, callback: () => void): void {
    addDoc(collection(db, "suggestions"), suggestion).then(() => {
      callback();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  public static saveRating(rating: RatingType, successCallback: (docRef:DocumentReference<DocumentData>) => void, errorCallback: ()=> void): void {
    const {id, rating: newValue} = rating;
    addDoc(collection(db, "ratings"), {
      name: id,
      rating: newValue
    }).then((docRef) => {
      successCallback(docRef);
    }).catch((error) => {
      console.log("Error adding document: ", error);
      errorCallback();
    });
  }

  public static updateRating(rating: number | null, docRef:string, successCallback: () => void, errorCallback: ()=> void): void {
    updateDoc(doc(db, "ratings", docRef), {
      rating
    }).then(() => {
      successCallback();
    }).catch((error) => {
      console.error("Error updating document: ", error);
      errorCallback();
    });
    return;
  }

  public static getFrameworkData(callBack:(frameworkData: Framework[])=>void): void {
    onSnapshot(collection(db, "framework-items"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Framework[];
      callBack(data);
    });
  }
}