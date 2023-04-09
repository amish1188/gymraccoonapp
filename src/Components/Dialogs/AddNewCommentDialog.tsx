import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

// modal context open, close, get value on closing, send value if exists

type AddNewCommentDialogProps = {
 closeDialog: () => void;
 updateComment: (value: string, currentCommentIndex?: number) => void;
 currentValue?: string;
 currentIndex?: number;
 isDialogOpen: boolean;
 errorText: string;
};

const AddNewCommentDialog = ({
 isDialogOpen,
 closeDialog,
 updateComment,
 currentValue,
 currentIndex,
 errorText
}: AddNewCommentDialogProps) => {
 const [value, setValue] = useState<string>(currentValue || '');
 const [isFormValid, setIsFormValid] = useState<boolean>(true);

 const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e) {
   setIsFormValid(true);
   setValue(e.target.value);
  }
 };

 const validateValue = (): boolean => {
  const isValid = !value ? false : true;
  return isValid;
 };

 const validateAndSetNewProgressValue = () => {
  const isValid = validateValue();
  if (!isValid) {
   setIsFormValid(false);
   return;
  }
  updateComment(value, currentIndex);
 };

 return (
  <>
   <Dialog onClose={closeDialog} open={isDialogOpen}>
    <DialogTitle>Add or update new comment</DialogTitle>
    <DialogContent>
     <TextField
      error={!isFormValid}
      autoFocus
      onChange={onChangeComment}
      helperText={isFormValid ? '' : errorText}
      id='new comment'
      multiline
      fullWidth
      maxRows={8}
      value={value || ''}
     ></TextField>
     <Stack
      sx={{ paddingTop: '1rem' }}
      spacing={2}
      direction='row'
      justifyContent='space-between'
     >
      <Button onClick={closeDialog} variant='text'>
       Cancel
      </Button>
      <Button
       onClick={validateAndSetNewProgressValue}
       sx={{ width: '50%' }}
       variant='contained'
      >
       Ok
      </Button>
     </Stack>
    </DialogContent>
   </Dialog>
  </>
 );
};

export default AddNewCommentDialog;
