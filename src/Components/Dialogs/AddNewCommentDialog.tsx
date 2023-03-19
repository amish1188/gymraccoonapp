import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

type AddNewCommentDialogProps = {
 closeDialog: () => void;
 isDialogOpen: boolean;
 errorText: string;
 setNewCommentValue: (newValue: string) => void;
};

const AddNewCommentDialog = ({
 isDialogOpen,
 closeDialog,
 setNewCommentValue,
 errorText
}: AddNewCommentDialogProps) => {
 const [newComment, setNewComment] = useState<string>('');
 const [isFormValid, setIsFormValid] = useState<boolean>(true);

 const validateAndSetNewProgressValue = (newValue: string) => {
  if (!newValue) {
   setIsFormValid(false);
  } else {
   setNewCommentValue(newValue);
  }
 };

 const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
  setIsFormValid(true);
  setNewComment(e.target.value);
 };

 return (
  <>
   <Dialog onClose={closeDialog} open={isDialogOpen}>
    <DialogTitle>Add new comment</DialogTitle>
    <DialogContent>
     <TextField
      error={!isFormValid}
      autoFocus
      onChange={onChangeComment}
      helperText={isFormValid ? '' : errorText}
      id='new comment'
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
       onClick={() => validateAndSetNewProgressValue(newComment)}
       sx={{ width: '50%' }}
       variant='contained'
      >
       Add
      </Button>
     </Stack>
    </DialogContent>
   </Dialog>
  </>
 );
};

export default AddNewCommentDialog;
