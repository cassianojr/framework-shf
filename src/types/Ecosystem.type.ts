interface Ecosystem {
  id?: string,
  organization_name: string,
  responses: number,
  admin_id: string,
  time_window: number,
  status: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished',
  current_round: number,
  participants: Participant[]
}

interface Participant {
  id: string,
  email: string
}

export type { Ecosystem, Participant };