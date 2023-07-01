import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Suggestion } from '../types/Suggestion.type';

export class FirebaseService {

  public static saveSuggestions(suggestion: Suggestion, callback: () => void): void {
    addDoc(collection(db, "suggestions"), suggestion).then(() => {
      callback();
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
}