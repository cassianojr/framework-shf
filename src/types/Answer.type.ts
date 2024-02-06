import { QuestionListItems } from "./Question.type";

interface NewAnswers {
  id?: string,
  user_id: string,
  user_email: string,
  ecossystem_id: string,
  answers: NewAnswer[],
  round: number
}

interface NewAnswer {
  framework_item: string,
  question: string,
  items: Item[]
}

interface Item {
  id: string,
  ids: {
    [key: string]: string
  },
  names: {
    [key: string]: string
  }
  answer: number
}


interface Answers {
  id?: string,
  user_id: string,
  user_email: string,
  ecossystem_id: string,
  answers: Answer[]
}

interface Answer {
  question_id: string,
  selectedItems?: QuestionListItems[],
  questionName?: string,
  correlations?: Correlation[]
}

interface Correlation {
  item: QuestionListItems,
  correlation_to: QuestionListItems[]
}

export type { Answers, Answer, Correlation, NewAnswers, NewAnswer, Item};