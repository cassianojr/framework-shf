import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogTitle, Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface ModalRootProps {
  state: boolean,
  handleClose: () => void,
  children: React.ReactNode,
  title: string,
  id: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false,
}

export function ModalRoot({ state, handleClose, children, title, id, size }: ModalRootProps) {

  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      maxWidth={size ?? 'sm'}
      keepMounted
      fullWidth
    >
      <DialogTitle id={`alert-dialog-title-${id}`}>
        {title}
      </DialogTitle>
      <Divider />

      {children}
    </Dialog>
  );
}