import { QuestionListItems } from "./Question.type";

interface Answers {
  id?: string,
  user_id: string,
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

export type { Answers, Answer, Correlation };