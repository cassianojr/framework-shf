import { collection, doc, onSnapshot } from "firebase/firestore";
import { Question } from "../types/Question.type";
import { db } from "./firebaseConfig";
import { Framework } from "../types/Framework.type";

export class QuestionService {

  public static getQuestions(callBack: (questions: Question[]) => void): void {
    onSnapshot(collection(db, "questions"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];

      const questions_data = data.map((question) => {
        if (question.items_id === undefined) return question;

        const { items_id } = question;

        const frameworkItemsRef = doc(db, "framework-items", items_id);
        onSnapshot(frameworkItemsRef, (snapshot) => {
          const data = snapshot.data() as Framework;
          question.framework_items = data;
          question.listItems = data.items.map((item) => {
            return {
              id: item.id,
              names: item.names,
              descriptions: item.descriptions,
              selected: false
            }
          });
          
        });
        return question;
      }) as Question[];


      callBack(questions_data);
    });
  }

}