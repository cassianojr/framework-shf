import { DocumentData, DocumentReference, addDoc, collection, onSnapshot } from "firebase/firestore";
import { Question, QuestionListItems } from "../types/Question.type";
import { db } from "./firebaseConfig";
import { FirebaseService } from "./FirebaseService";
import { Answer } from "../types/Answer.type";

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

  public static saveAnswers(answers: Answer[], successCallback: (docRef: DocumentReference<DocumentData>) => void, errorCallback: () => void): void {
    
    answers.forEach((answer) => {

      addDoc(collection(db, "answers"), answer).then((docRef) => {
        successCallback(docRef);
      }).catch((error) => {
        console.log("Error adding document: ", error);
        errorCallback();
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