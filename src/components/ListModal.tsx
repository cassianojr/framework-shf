import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, ListItem, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    title: string,
    items: {
      id: string,
      name: string,
      description: string
    }[]
  }
}

export default function ListModal(props: ModalProps) {
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
      <Divider />
      <DialogContent>
        {modalContent.items.map((item) => (
          
          <ListItem key={item.id}>
            {item.name}
          </ListItem>
        ))}

      </DialogContent>
      <Divider />
      <DialogActions >
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );


}
