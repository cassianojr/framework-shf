import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSuccess: () => void,
  handleClose: () => void,
}

export default function AlertDialog(props: AlertDialogProps) {
  const { open, handleSuccess, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-title">
        Você gostaria de consultar alguns mecanismos de enfrentamento?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' color='error'>Não</Button>
        <Button onClick={handleSuccess} variant='contained' color='success'>Sim</Button>
      </DialogActions>
    </Dialog>
  );
}