import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface SnackBarProps {
  snackBarState: boolean,
  setSnackBarState: React.Dispatch<React.SetStateAction<boolean>>,
  text: string,
  severity: 'success' | 'info' | 'warning' | 'error'
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarComponent({ snackBarState, setSnackBarState, text, severity }: SnackBarProps) {

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarState(false);
  };


  return (
    <Snackbar
      open={snackBarState}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ widows: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
}