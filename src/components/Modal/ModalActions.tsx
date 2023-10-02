import { Button, DialogActions } from '@mui/material'

interface ModalProps {
  handleClose: () => void,
  children?: React.ReactNode,
}
export function ModalActions({ handleClose, children }: ModalProps) {
  return (
    <DialogActions>
      {children??<Button onClick={handleClose}>Fechar</Button>}
    </DialogActions>
  )
}
