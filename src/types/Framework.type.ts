interface FrameworkItem {
  id: string,
  name: string,
  description: string,
  rating?: number,
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