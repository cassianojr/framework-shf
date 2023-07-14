import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import RatingComponent from '../RatingComponent'


interface EvaluateActionProps {
  id: string,
  handleClose: () => void,
  children?: React.ReactNode
}

export function ModalEvaluateAction({ id, children, handleClose }: EvaluateActionProps) {
  return (
    <Grid container justifyContent='space-between' alignItems='center' >
      <Box>
        <Typography>Was this helpful?</Typography>
        <RatingComponent id={id} />
      </Box>
      <Box>
        {children ?? <></>}
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Grid>
  )
}

