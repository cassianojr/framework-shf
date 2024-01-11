import { InfoRounded } from "@mui/icons-material";
import { ButtonBase, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import i18next from "i18next";
import React from 'react';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Modal } from ".";

interface ModalProps {
  items: React.MutableRefObject<ItemType[]>,
  changeItems: (value: ItemType[]) => void,
  showVotes?: boolean
}

interface ItemType {
  id: string,
  ids: {
    [key: string]: string
  },
  names: {
    [key: string]: string
  },
  descriptions: {
    [key: string]: string
  },
  liked: boolean,
  disliked: boolean,
  votes?: number
}


export function ModalListSelect({ items, showVotes, changeItems }: ModalProps) {
  const [listItems, setListItems] = React.useState(items.current);

  const [descriptionModalState, setDescriptionModalState] = React.useState(false);
  const [descriptionModalContent, setDescriptionModalContent] = React.useState({
    id: '',
    title: '',
    body: '',
  });


  const handleToggleLike = (id: string) => {

    const newListItems = items.current.map((listItem) => {

      if (listItem.id === id) {
        return { ...listItem, liked: !listItem.liked, disliked: false };
      }
      return listItem;
    });

    changeItems(newListItems);
    setListItems(newListItems);
  }

  const handleToggleDislike = (id: string) => {
    const newListItems = items.current.map((listItem) => {

      if (listItem.id === id) {
        return { ...listItem, disliked: !listItem.disliked, liked: false };
      }
      return listItem;
    });

    setListItems(newListItems);
    changeItems(newListItems);
  }

  const DescriptionModal = (
    <Modal.Root state={descriptionModalState} handleClose={() => setDescriptionModalState(false)} id={descriptionModalContent.id} title={descriptionModalContent.title}>
      <Divider />
      <Modal.Text content={descriptionModalContent.body} />
      <Modal.Actions handleClose={() => setDescriptionModalState(false)} />
    </Modal.Root>
  );

  const handleItemClick = (id: string, name: string, description: string) => {
    setDescriptionModalContent({
      id,
      title: name,
      body: description,
    });

    setDescriptionModalState(true);
  }

  return (
    <>
      {DescriptionModal}
      <List dense>
        {listItems.map((item) => (
          <ListItem dense
            secondaryAction={
              <>
                {showVotes && item.votes}
                <IconButton edge="end" aria-label="details" onClick={() => handleItemClick(item.id, item.names[i18next.language], item.descriptions[i18next.language])}>
                  <InfoRounded />
                </IconButton>
              </>
            }
            id={item.id}
            key={item.id}
            divider={true}
          >
            <React.Fragment key={item.id}>
              <ListItemIcon>
                <ButtonBase sx={{ padding: 0 }} onClick={() => handleToggleLike(item.id)}>
                  {item.liked ? <ThumbUpIcon sx={{ color: 'green' }} /> : <ThumbUpOffAltIcon sx={{ color: 'green' }} />}
                </ButtonBase>
                <ButtonBase sx={{ padding: 0 }} onClick={() => handleToggleDislike(item.id)}>
                  {item.disliked ? <ThumbDownIcon sx={{ color: 'red' }} /> : <ThumbDownOffAltIcon sx={{ color: 'red' }} />}
                </ButtonBase>
              </ListItemIcon>
              <ListItemText primary={
                <Typography sx={{ fontSize: '.9rem' }}>
                  <span style={{ fontWeight: 'bold' }}>{item.ids[i18next.language]}: </span>
                  {item.names[i18next.language]}
                </Typography>}
              />
            </React.Fragment>
          </ListItem>
        ))}
      </List>
    </>
  )
}

