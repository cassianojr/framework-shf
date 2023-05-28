import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, DialogContent, Divider, Grid, Typography } from '@mui/material';
import RatingComponent from './RatingComponent';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void,
  modalContent: {
    id: string,
    title: string,
    body: string,
  }

}

export default function Modal(props: ModalProps) {
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
        {modalContent.title}
      </DialogTitle>
      <DialogContent>
        {modalContent.body}
      </DialogContent>
      <Divider />
      <DialogActions >
        <Grid container justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography>Was this helpful?</Typography>
            <RatingComponent id={modalContent.id}/>
          </Box>
          <Button onClick={handleClose}>Close</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}