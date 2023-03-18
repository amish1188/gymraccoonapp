import React, {
 useContext,
 useEffect,
 useRef,
 useState,
 KeyboardEvent
} from 'react';

import { CurrentTrainingContext } from '../context/CurrentTrainingContext';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type DialogComponentProps = {
 closeDialog: () => void;
 isDialogOpen: boolean;
 currentValue: number;
 dayId: number | undefined;
 exerciseId: string | undefined;
 setNewProgressValue: (newValue: number) => void;
};

const DialogComponent = ({
 isDialogOpen,
 closeDialog,
 currentValue,
 setNewProgressValue,
 exerciseId,
 dayId
}: DialogComponentProps) => {
 const [progressValue, setProgressValue] = useState<string>('');

 useEffect(() => {
  setProgressValue(`${currentValue}`);
 }, []);

 const onChangeCurrentProgressValue = (
  e: React.ChangeEvent<HTMLInputElement>
 ) => {
  setProgressValue(e.target.value);
 };

 const checkIfNumberInput = (e: KeyboardEvent<HTMLImageElement>) => {
  if (!/^[0-9]*\.?[0-9]*$/.test(e.key)) {
   e.preventDefault();
  }
 };

 /* const setNewProgressValue = () => {
  progressValue &&
   currentContext?.setNewProgressValue(dayId, exerciseId, +progressValue);
  closeDialog();
 };*/

 if (!dayId && !exerciseId) return <div>Loading</div>;

 return (
  <>
   <Dialog onClose={closeDialog} open={isDialogOpen}>
    <DialogTitle>Set new progress</DialogTitle>
    <DialogContent>
     <TextField
      autoFocus
      onKeyPress={checkIfNumberInput}
      onChange={onChangeCurrentProgressValue}
      id='new progress'
      value={progressValue}
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
       onClick={() => setNewProgressValue(+progressValue)}
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

export default DialogComponent;
