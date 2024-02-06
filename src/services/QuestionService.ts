import { DocumentData, DocumentReference, addDoc, collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { Question, QuestionListItems } from "../types/Question.type";
import { db } from "./firebaseConfig";
import { FirebaseService } from "./FirebaseService";
import { NewAnswers } from "../types/Answer.type";

export class QuestionService {

  public static getQuestions(callBack: (questions: Question[]) => void): void {
    onSnapshot(collection(db, "questions"), (snapshot) => {

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];

      QuestionService.getQuestionsListItems(data, (questions) => {
        callBack(questions);
      });
    });
  }

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

  private static getQuestionsListItems(questions: Question[], callBack: (questions: Question[]) => void): void {
    questions.map((question) => {
      if (question.items_id === undefined) return question;

      const { items_id } = question;
      FirebaseService.getFrameworkById(items_id).then((framework) => {
        question.framework_items = framework;
        question.listItems = framework.items.map((item) => {
          return {
            id: item.id,
            names: item.names,
            descriptions: item.descriptions,
            selected: false,
            suggestion: false
          } as QuestionListItems;
        });
      }).then(() => {
        callBack(questions);
      });
    });
  }

}