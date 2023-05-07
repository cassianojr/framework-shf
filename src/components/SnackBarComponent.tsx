import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackBarProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SnackBarComponent(props: SnackBarProps) {
  const { open, setOpen } = props;

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='success' sx={{ widows: '100%' }}>
        Obrigado pela sua resposta! Aproveite para avaliar as outras atividades da gerência de requisitos.
      </Alert>
    </Snackbar>
  );
}