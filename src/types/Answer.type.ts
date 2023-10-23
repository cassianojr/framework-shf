interface Answer{
    id?: string,
    question_id: string,
    ecossystem_id: string,
    user_id: string,
    selectedItems?: string[],
    correlations?: Correlation[]
}

interface Correlation{
    item: string,
    correlation_to: string[]
}

export type {Answer};