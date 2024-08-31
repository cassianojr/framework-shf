import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { NewAnswers } from "../types/Answer.type";

export class QuestionService {

  public static saveAnswers(answers: NewAnswers, successCallback: (docRef: DocumentReference<DocumentData>) => void, errorCallback: () => void): void {

    addDoc(collection(db, "answers"), answers).then((docRef) => {
      successCallback(docRef);
    }).catch((error) => {
      console.log("Error adding document: ", error);
      errorCallback();
    });

  }

  public static getAnswers(answerId: string): Promise<NewAnswers> {
    return new Promise((resolve, reject) => {
      const answerRef = doc(db, "answers", answerId);
      const unsubscribe = onSnapshot(answerRef, (snapshot) => {
        if (!snapshot.exists()) {
          unsubscribe();
          reject("No such document!");
        } else {
          const data = snapshot.data() as NewAnswers;
          resolve(data);
        }
      }, (error) => {
        console.log("Error getting documents: ", error);
        unsubscribe();
        reject(error);
      });
    });
  }

  public static getAnswersByUserId(userId: string): Promise<NewAnswers[]> {
    return new Promise((resolve, reject) => {
      const q = query(collection(db, "answers"), where("user_id", "==", userId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          unsubscribe();
          reject("No such document!");
        } else {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as NewAnswers[];
          resolve(data);
        }
      }, (error) => {
        console.log("Error getting documents: ", error);
        unsubscribe();
        reject(error);
      });
    });
  }

  public static getEcosAnswers(ecosId: string): Promise<NewAnswers[]> {
    return new Promise((resolve, reject) => {
      const q = query(collection(db, "answers"), where("ecossystem_id", "==", ecosId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
          unsubscribe();
          reject("No such document!");
        } else {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as NewAnswers[];
          resolve(data);
        }
      }, (error) => {
        console.log("Error getting documents: ", error);
        unsubscribe();
        reject(error);
      });
    });
  }

  public static deleteAnswer(answerId: string){
    return deleteDoc(doc(db, "answers", answerId));
  }
  
}