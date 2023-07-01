import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RatingComponent from '../RatingComponent'


interface EvaluateActionProps{
  id: string,
  setModalState: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalEvaluateAction({id, setModalState}: EvaluateActionProps) {
  return (
    <Grid container justifyContent='space-between' alignItems='center' >
      <Box>
        <Typography>Was this helpful?</Typography>
        <RatingComponent id={id} />
      </Box>
      <Button onClick={() => setModalState(false)}>Close</Button>
    </Grid>
  )
}

