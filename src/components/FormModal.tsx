import { Button, Grid, TextField } from '@mui/material';

import React from 'react';
import Modal from './Modal';
import { db } from '../services/firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import SnackBarComponent from './SnackBarComponent';

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

  const [snackBarState, setSnackBarState] = React.useState(false);

  const [formState, setFormState] = React.useState({
    type: modalContentForm.title,
    title: '',
    description: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      ...formState,
      type: modalContentForm.title
    }

    addDoc(collection(db, "suggestions"), formData).then(() => {
      setFormState({
        type: modalContentForm.title,
        title: '',
        description: ''
      });
      setFormModalState(false);
      setSnackBarState(true);
    }
    ).catch((error) => {
      console.error("Error adding document: ", error);
    }
    );
  }

  return (
    <>
    <SnackBarComponent open={snackBarState} setOpen={setSnackBarState}/>
      <Modal
        open={formModalState}
        handleClose={() => setFormModalState(false)}
        modalContent={modalContentForm}
        setOpen={setFormModalState}
      >
        <form onSubmit={handleSubmit}>
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
                onChange={handleFormChange}
                value={formState.title}
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
                onChange={handleFormChange}
                value={formState.description}
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
    </>
  );


}
