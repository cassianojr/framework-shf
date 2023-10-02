export interface Step {
    id: string,
    label: string,
    order: number,
    type: StepType,
    correlateId?: string,
    correlatedToId?: string,
    correlateWith?: StepItem[],
    itemsToCorrelate?: StepItem[],
    listItems: StepItem[]
}

export interface StepItem{
    id: string,
    name: string,
    selected: boolean,
    description?: string,
}

export enum StepType{
    listSelect,
    correlate
}