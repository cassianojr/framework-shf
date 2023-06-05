import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, TextField } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
}

);

interface ModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void,
  modalContent: {
    id: string,
    title: string
  }
}

export default function FormModal(props: ModalProps) {
  const { open, handleClose, modalContent } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      maxWidth='sm'
      keepMounted
      fullWidth
    >
      <DialogTitle id={`alert-dialog-title-${modalContent.id}`}>
        ADD NEW {modalContent.title}
      </DialogTitle>
      <Divider />
      <DialogContent>
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
                value={modalContent.title}
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
      </DialogContent>
      <Divider />
      <DialogActions >
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );


}
