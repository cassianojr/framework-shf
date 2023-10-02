import React from 'react';
import { Button, DialogContent, Grid, TextField } from "@mui/material";
import { FirebaseService } from '../../services/FirebaseService';

interface ModalProps {
  setFormModalState: React.Dispatch<React.SetStateAction<boolean>>
  title: string,
  setSnackBarState: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalForm({ setFormModalState, title, setSnackBarState }: ModalProps) {


  const [formState, setFormState] = React.useState({
    type: title,
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
      type: title
    }

    FirebaseService.saveSuggestions(formData, () => {
      setFormState({
        type: title,
        title: '',
        description: ''
      });
      setFormModalState(false);
      setSnackBarState(true);
    });
  }

  return (
    <DialogContent>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ marginTop: '1%' }}>
            <TextField
              fullWidth
              required
              id="type"
              name="type"
              label="Tipo"
              autoFocus
              disabled
              value={title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              id="title"
              name="title"
              label="Título"
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
              label="Descrição"
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
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </DialogContent>
  )
}

