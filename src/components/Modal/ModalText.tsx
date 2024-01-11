import { DialogContent, Typography } from "@mui/material";

interface ModalProps {
  content?: string,
  dense?: boolean,
  children?: React.ReactNode
}

export function ModalText({ content, dense = false, children }: ModalProps) {
  const denseStyle = dense ? { padding: 0 } : {}
  return (
    <DialogContent sx={denseStyle}>
      {children ?? <Typography sx={{ textAlign: 'justify' }}>{content}</Typography>}
    </DialogContent>
  )
}

