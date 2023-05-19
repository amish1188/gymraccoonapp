import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './Exercises.scss';
import { editExerciseName } from './exerciseHelper';

type ExerciseListTitleAndAddNewButtonProps = {
 title: string;
};

const ExerciseListSubPartTitleAndAddNewButton = (
 props: ExerciseListTitleAndAddNewButtonProps
) => {
 const title = editExerciseName(props.title);

 return (
  <div className='title'>
   <p>{title} </p>
   <IconButton>
    <AddIcon />
   </IconButton>
  </div>
 );
};

export default ExerciseListSubPartTitleAndAddNewButton;
