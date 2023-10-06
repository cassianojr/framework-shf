import { Framework } from "./Framework.type"

interface Question {
  id: string,
  title:{
    [key: string]: string
  },
  description_title:{
    [key: string]: string
  },
  description:{
    [key: string]: string
  },
  type: QuestionType,
  order: number,
  items_id?: string,
  framework_items?: Framework,
  suggest_title?:{
    [key: string]: string
  },
  suggest_description?:{
    [key: string]: string
  },
  correlateToId?: string,
  correlateWithId?: string,
  correlateWith?: QuestionListItems[],
  itemsToCorrelate?: QuestionListItems[],
  listItems: QuestionListItems[],
}

export enum QuestionType{
  select = "select",
  correlate = "correlate"
}

interface QuestionListItems{
  id: string,
  names:{
    [key: string]: string
  },
  selected: boolean,
  descriptions:{
    [key: string]: string
  },
}

export type {Question, QuestionListItems};