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
  validationError: boolean
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