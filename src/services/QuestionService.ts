import { DocumentData, DocumentReference, addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { Question, QuestionListItems } from "../types/Question.type";
import { db } from "./firebaseConfig";
import { FirebaseService } from "./FirebaseService";
import { Answers } from "../types/Answer.type";

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

  public static saveAnswers(answers: Answers, successCallback: (docRef: DocumentReference<DocumentData>) => void, errorCallback: () => void): void {

    addDoc(collection(db, "answers"), answers).then((docRef) => {
      successCallback(docRef);
    }).catch((error) => {
      console.log("Error adding document: ", error);
      errorCallback();
    });

  }

  public static getAnswers(ecosId: string, successCallback: (answers: Answers[]) => void, errorCallback: () => void): void {
    const q = query(collection(db, "answers"), where("ecossystem_id", "==", ecosId));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Answers[];
      successCallback(data);
    }, (error) => {
      console.log("Error getting documents: ", error);
      errorCallback();
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