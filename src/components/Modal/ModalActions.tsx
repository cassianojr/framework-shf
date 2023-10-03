import { Button, DialogActions } from '@mui/material'

interface ModalProps {
  handleClose: () => void,
  children?: React.ReactNode,
}
import {useTranslation} from "react-i18next";


export function ModalActions({ handleClose, children }: ModalProps) {

  const {t} = useTranslation('common');

  return (
    <DialogActions>
      {children??<Button onClick={handleClose}>{t('close_button')}</Button>}
    </DialogActions>
  )
}
