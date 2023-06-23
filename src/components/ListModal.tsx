import {IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import Modal from './Modal';
import { InfoRounded } from '@mui/icons-material';

interface ModalProps {
  modalState: boolean,
  setModalstate: React.Dispatch<React.SetStateAction<boolean>>
  handleClose: () => void,
  modalContent: {
    id: string,
    title: string,
    items: {
      id: string,
      name: string,
      description: string
    }[]
  },
  handleItemClick: (id: string, name: string, description: string) => void
}
// handleButtonClick(item.id, item.name, item.description)
export default function ListModal(props: ModalProps) {
  const { modalState, modalContent, setModalstate, handleItemClick } = props;

  return (
    <Modal
      open={modalState}
      handleClose={() => setModalstate(false)}
      modalContent={modalContent}
      setOpen={setModalstate}
      dense
      >
      <List dense >
        {modalContent.items.map((item) => (
          <ListItem dense
            secondaryAction={
              <IconButton edge="end" aria-label="details" onClick={() => handleItemClick(item.id, item.name, item.description)}>
                <InfoRounded />
              </IconButton>
            }
            id={item.id}
            key={item.id}
            divider={true}
          >
            <ListItemText primary={
              <Typography sx={{ fontSize: '.9rem' }}>
                <span style={{ fontWeight: 'bold' }}>{item.id}: </span>
                {item.name}
              </Typography>} />
          </ListItem>
        ))}
      </List>
    </Modal>
  );


}
