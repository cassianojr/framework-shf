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
  agree?: number,
  disagree?: number,
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