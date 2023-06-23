import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogContent, Divider} from '@mui/material';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
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
   
  },
  children: JSX.Element,
  action?: JSX.Element,
  dense?: boolean

}

export default function Modal(props: ModalProps) {
  const { open, handleClose, modalContent, children, dense } = props;

  const denseStyle = dense ? {padding: 0} : {};

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
      <Divider />
      <DialogContent sx={denseStyle}>
        {children}
      </DialogContent>
      <Divider />
      <DialogActions >
        {props.action??<Button onClick={handleClose}>Close</Button>}
      </DialogActions>
    </Dialog>
  );
}