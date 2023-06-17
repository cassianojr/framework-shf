import { Button, Grid, TextField } from '@mui/material';

import React from 'react';
import Modal from './Modal';

interface ModalProps {
  formModalState: boolean,
  setFormModalState: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void,
  modalContentForm: {
    id: string,
    title: string
  }
}

export default function FormModal(props: ModalProps) {
  const { formModalState, setFormModalState, modalContentForm } = props;

  return (
    <Modal
      open={formModalState}
      handleClose={() => setFormModalState(false)}
      modalContent={modalContentForm}
      setOpen={setFormModalState}
    >
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: '1%' }}>
            <TextField
              fullWidth
              required
              id="type"
              name="type"
              label="Type"
              autoFocus
              disabled
              value={modalContentForm.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="title"
              name="title"
              label="Title"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );


}
