import { Grid } from '@mui/material';
import ExerciseAccordion from '../ExerciseAccordion';
import { useState } from 'react';
import { ProgramDay } from './Swiper';

interface DaySlideProps {
 openDialog: (
  dayId: string,
  exerciseId: string,
  dialogId: string,
  current?: number
 ) => void;
 day: ProgramDay;
 dayIndex: number;
}

const DaySlide = ({ openDialog, day, dayIndex }: DaySlideProps) => {
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
    {day.exercises.map((exercise, index) => (
     <ExerciseAccordion
      dayId={day.id}
      dayIndex={dayIndex}
      exercise={exercise}
      exerciseIndex={index}
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
