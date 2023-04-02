import { TrainingDay } from '../../context/CurrentTrainingContext';
import { Grid } from '@mui/material';
import ExerciseAccordion from '../ExerciseAccordion';
import { useState } from 'react';

interface DaySlideProps {
 openDialog: (
  dayId: number,
  exerciseId: string,
  dialogId: string,
  current?: number
 ) => void;
 day: TrainingDay;
 setNewProgressValue: (newValue: number) => void;
}

const DaySlide = ({ openDialog, day }: DaySlideProps) => {
 const [expanded, setExpanded] = useState<string | null>(null);

 const setExpandedExercise = (id: string) => {
  if (expanded == id) {
   setExpanded(null);
   return;
  }
  setExpanded(id);
 };

 return (
  <Grid
   className='noSwipe'
   container
   justifyContent='center'
   style={{ maxWidth: '700px', margin: 'auto' }}
   spacing={0}
  >
   <Grid container direction='column' alignItems='center' item xs={10}>
    <h1>{day.name}</h1>
    {day.exercises.map((exercise) => (
     <ExerciseAccordion
      dayId={day.id}
      exercise={exercise}
      setExpandedExercise={setExpandedExercise}
      expanded={expanded}
      key={exercise.id}
      openDialog={openDialog}
     ></ExerciseAccordion>
    ))}
   </Grid>
  </Grid>
 );
};

export default DaySlide;
