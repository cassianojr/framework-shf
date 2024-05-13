import { FrameworkItem } from "./Framework.type"

interface EcosProject {
  id?: string,
  name: string,
  end_date: string,
  participants: Participant[],
  admin_id: string,
  mandatory_items: MandatoryItems,
  status: 'not-started' | 'waiting-for-answers' | 'in-analysis' | 'finished' 
}
interface MandatoryItems {
  shf: FrameworkItem[],
  cc: FrameworkItem[],
  barriers: FrameworkItem[],
  strategies: FrameworkItem[]
}

interface Participant {
  id: string,
  email: string
}

export type { EcosProject, Participant, MandatoryItems };