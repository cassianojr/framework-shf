interface FrameworkItem{
  id: string,
  name: string,
  description: string,
  rating?: number,
}

interface Framework{
  id: string,
  label: string,
  description: string,
  headerColor: string,
  items: Array<FrameworkItem>
}

export type {FrameworkItem, Framework};