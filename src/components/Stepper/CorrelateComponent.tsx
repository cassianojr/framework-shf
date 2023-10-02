import { Container,  Box } from '@mui/material';
import CheckboxesTags from './CheckboxTags';
import { Step } from '../../types/Step.type';

interface CorrelateData {
  items: Step
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
              <h3>{item.name}</h3>
              <CheckboxesTags itemId={item.id} itemName={item.name} options={options} />
            </Box>
          )
        })}

      </Container>
    </>
  )
}
