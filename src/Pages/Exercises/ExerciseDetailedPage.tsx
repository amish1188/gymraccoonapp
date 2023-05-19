import Box from '@mui/material/Box';

import { useParams } from 'react-router-dom';
import { useGetExercise } from '../../queryHooks/useExerciseData';
import { editExerciseName } from './exerciseHelper';
import { ExerciseItem } from './ExerciseList';

import './Exercises.scss';

const ExerciseDetailedPage = () => {
 const { bodyPart, subPart, exercise } = useParams();
 let d: ExerciseItem | undefined;
 let nameEdited = '';

 if (bodyPart && subPart && exercise) {
  d = useGetExercise(bodyPart, subPart, exercise);
  if (d !== undefined) {
   nameEdited = editExerciseName(d.name);
  }
 }
 if (d == undefined) return <p>this</p>;

 return (
  <div className='layout'>
   <Box>{nameEdited}</Box>
   <Box>video will be here</Box>
   <Box sx={{ display: 'flex' }}>
    <p>description will be here </p>
    <div>muscles group image will be here</div>
   </Box>
   <Box>progress will be here</Box>
  </div>
 );
};

export default ExerciseDetailedPage;
