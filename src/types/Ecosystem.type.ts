interface Ecosystem {
  id?: string,
  organization_name: string,
  responses: number,
  admin_id: string,
  time_window: number,
  amount_rounds: number,
  status: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished'
}

export type { Ecosystem };