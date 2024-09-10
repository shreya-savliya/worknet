import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';

const Dialog = ({ open, onClose, errorMessage }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: 'red', fontWeight: 600 }}>Error</DialogTitle>
      <DialogContent>{errorMessage}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialog;
