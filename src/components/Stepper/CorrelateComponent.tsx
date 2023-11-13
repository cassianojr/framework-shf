import { Container, Box } from '@mui/material';
import CheckboxesTags from './CheckboxTags';
import { QuestionListItems } from '../../types/Question.type';
import i18next from 'i18next';
import * as React from 'react';

export interface CorrelateItems {
  correlateWith: QuestionListItems[],
  itemsToCorrelate: QuestionListItems[]
}

interface CorrelateData {
  items: CorrelateItems,
  values: CorrelateValues[],
  setValues: (value: CorrelateValues[]) => void
}


export interface CorrelateValues {
  correlateWith: QuestionListItems,
  itemsToCorrelate: QuestionListItems[]
}

export default function CorrelateComponent({ items, values, setValues }: CorrelateData) {


  const options = items.itemsToCorrelate;

  React.useEffect(() => {
    const correlateValues = items.correlateWith.map((item) => {
      return {
        correlateWith: item,
        itemsToCorrelate: []
      } as CorrelateValues
    });
    setValues(correlateValues);
  }, [items, setValues]);


  return (
    <>
      <Container>
        {items.correlateWith.map((item) => {
          return (
            <Box key={item.id}>
              <h3>{item.names[i18next.language]}</h3>
              <CheckboxesTags itemId={item.id} itemName={item.names[i18next.language]} options={options} values={values} setValues={setValues} />
            </Box>
          )
        })}

      </Container>
    </>
  )
}
