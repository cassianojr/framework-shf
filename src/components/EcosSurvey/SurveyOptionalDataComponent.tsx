import React from 'react'
import { FrameworkItem } from '../../types/Framework.type'
import { ToggleButton, Tooltip, Typography } from '@mui/material'
import i18next from 'i18next'
import SurveyCommentModal from './SurveyCommentModal'
import { Box } from '@mui/system'

interface SurveyOptionalDataComponentProps {
  items: React.MutableRefObject<FrameworkItem[]>,
  changeItems: (value: FrameworkItem[]) => void,
  title: string
}

export default function SurveyOptionalDataComponent({ items, changeItems, title }: SurveyOptionalDataComponentProps) {

  const [commentModalState, setCommentModalState] = React.useState(false);
  const [commentModalItem, setCommentModalItem] = React.useState<FrameworkItem | undefined>(undefined);
  const [reload, setReload] = React.useState(false);

  const handleToggleButtonClick = (item: FrameworkItem) => {
    if (item.comment !== undefined && item.comment !== '') {
      UnmarkItem(item);
    } else {
      setCommentModalItem(item);
      setCommentModalState(true);
    }
  };

  const UnmarkItem = (item: FrameworkItem) => {
    const newItem = { ...item, comment: '' };
    const newItems = items.current.map((i) => i.ids[i18next.language] === item.ids[i18next.language] ? newItem : i);
    
    changeItems(newItems);
    setReload(!reload);
  }

  return (
    <>
      <SurveyCommentModal items={items} changeItems={changeItems} commentModalItem={commentModalItem} modalState={commentModalState} setModalState={setCommentModalState} />
      <Box sx={{ mt: '1rem' }}>
        <Typography variant='h6' sx={{ textAlign: 'justify' }}>{title}</Typography>

        {items.current.map((item, index) => {
          return (
            <Tooltip
              arrow
              key={`item-${index}`}
              title={<p style={{ fontSize: '1rem', textAlign: 'justify' }}>{item.descriptions[i18next.language]}</p>}
            >
              <ToggleButton
                value="check"
                selected={item.comment !== undefined && item.comment !== ''}
                sx={{
                  m: '0.5rem',
                  color: '#1976d2',
                  border: '1px solid rgba(25,118,210,0.5)',
                  "&.Mui-selected, &.Mui-selected:hover": {
                    color: "white",
                    backgroundColor: '#2e7d32'
                  }
                }}
                onClick={() => handleToggleButtonClick(item)}
              >
                {item.names[i18next.language]}
              </ToggleButton>
            </Tooltip>
          )
        })
        }
      </Box>
    </>
  )
}