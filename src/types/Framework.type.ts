interface FrameworkItem {
  id: string,
  ids: {
    [key: string]: string
  },
  name: string,
  names: {
    [key: string]: string
  },
  description: string,
  descriptions: {
    [key: string]: string
  },
  rating?: number,
  ratio?: number,
  totallyAgree?: number,
  agree?: number,
  neutral?: number,
  disagree?: number,
  totallyDisagree?: number,
  comment?: string,
  validationError?: boolean,
  feedbackValidationError?: boolean,
  selected?: boolean,
  answer?: FrameworkAnswer,
  optionalAnswer?: FrameworkAnswer,
  order?: {
    [key: string]: number
  },
}

interface FrameworkAnswer {
  agree: number,
  disagree: number,
  positiveSentiment: number,
  negativeSentiment: number,
  neutralSentiment: number,
  comments: Array<string>
}

interface Framework {
  id: string,
  label: string,
  labels: {
    [key: string]: string
  },
  description: string,
  descriptions: {
    [key: string]: string
  },
  headerColor: string,
  items: Array<FrameworkItem>
}

export type { FrameworkItem, Framework };