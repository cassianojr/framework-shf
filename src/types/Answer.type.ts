interface NewAnswers {
  id?: string,
  user_id: string,
  user_email: string,
  ecossystem_id: string,
  answers: NewAnswer[],
  optionalAnswers: NewAnswer[],
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
  answer: number,
  comment?: string
}


export type {NewAnswers, NewAnswer, Item};