import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

enum DialogType {
  STRATEGY = 'STRATEGY',
  COPING_MECHANISM = 'COPING_MECHANISM',
}


interface DialogComponentProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSuccess: () => void,
  handleClose: () => void,
  dialogData: {
    id?: number,
    name?: string,
    description?: string,
  },
  type: DialogType,
}

export default function DialogComponent(props: DialogComponentProps) {
  const { open, dialogData, handleSuccess, handleClose, type } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{dialogData.name}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-slide-description">
          {dialogData.description}
        </DialogContentText>
      </DialogContent>
      <DialogContent>
        <DialogContentText>{(type === DialogType.STRATEGY) ? "A estratégia" : "O mecanismo de enfrentamento"} ajudou a realizar melhorias?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained' color='error'>Não</Button>
        <Button onClick={handleSuccess} variant='contained' color='success'>Sim</Button>
      </DialogActions>
    </Dialog>
  );
}