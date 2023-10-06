import { Container,  Box } from '@mui/material';
import CheckboxesTags from './CheckboxTags';
import { Question } from '../../types/Question.type';
import i18next from 'i18next';

interface CorrelateData {
  items: Question
}

export default function CorrelateComponent({ items }: CorrelateData) {
  if (!items.itemsToCorrelate || !items.correlateWith) return (<></>);

  const options = items.itemsToCorrelate;

  return (
    <>
      <Container>
        {items.correlateWith.map((item) => {
          return (
            <Box key={item.id}>
              <h3>{item.names[i18next.language]}</h3>
              <CheckboxesTags itemId={item.id} itemName={item.names[i18next.language]} options={options} />
            </Box>
          )
        })}

      </Container>
    </>
  )
}
