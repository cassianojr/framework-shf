import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import RatingComponent from './RatingComponent';
import Modal from './Modal';

interface ModalProps {
  modalState: boolean,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void,
  modalContent: {
    id: string,
    title: string,
    body: string,
  }
}

export default function TextModal(props: ModalProps) {
  const { modalState, handleClose, modalContent, setModalState } = props;

  return (
    <Modal
        open={modalState}
        handleClose={handleClose}
        modalContent={modalContent}
        setOpen={setModalState}
        action={
          <Grid container justifyContent='space-between' alignItems='center' >
            <Box>
              <Typography>Was this helpful?</Typography>
              <RatingComponent id={modalContent.id} />
            </Box>
            <Button onClick={() => setModalState(false)}>Close</Button>
          </Grid>
        }>
        <Typography>{modalContent.body}</Typography>
      </Modal>
  );
}