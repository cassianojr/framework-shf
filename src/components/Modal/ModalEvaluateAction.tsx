import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RatingComponent from '../RatingComponent'
import {useTranslation} from "react-i18next";


interface EvaluateActionProps {
  id: string,
  handleClose: () => void,
  children?: React.ReactNode
}

export function ModalEvaluateAction({ id, children, handleClose }: EvaluateActionProps) {

const {t} = useTranslation('common');

  return (
    <Grid container justifyContent='space-between' alignItems='center' >
      <Box>
        <Typography>{t('feedback_label')}</Typography>
        <RatingComponent id={id} />
      </Box>
      <Box>
        {children ?? <></>}
        <Button onClick={handleClose}>{t('close_button')}</Button>
      </Box>
    </Grid>
  )
}

