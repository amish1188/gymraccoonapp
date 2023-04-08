import { Accordion, Grid } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';

import CommentSection from './Comments/CommentSection';
import { Exercise } from './Swiper/Swiper';

interface ExerciseAccordionProps {
 exercise: Exercise;
 exerciseIndex: number;
 dayId: string;
 dayIndex: number;
 expanded: string | null;
 setExpandedExercise: (id: string) => void;
 children?: React.ReactNode;
 openDialog: (
  dayId: string,
  exerciseId: string,
  dialogId: string,
  current?: number
 ) => void;
}

const ExerciseAccordion = ({
 expanded,
 dayId,
 dayIndex,
 setExpandedExercise,
 openDialog,
 exercise,
 exerciseIndex,
 children
}: ExerciseAccordionProps) => {
 const { id, name, sets, reps, progress, comments } = exercise;
 // since i have id of the current exercise i need to fetch data here

 const [currentProgress, setCurrentProgress] = useState<number>(0);

 useEffect(() => {
  setCurrentProgress(progress[progress.length - 1]);
 }, [progress]);

 return (
  <Accordion expanded={expanded == id} style={{ width: '100%' }}>
   <AccordionSummary
    expandIcon={<ExpandMoreIcon onClick={() => setExpandedExercise(id)} />}
    aria-controls='panel1a-content'
    id='panel1a-header'
   >
    <Typography className='noSwipe' sx={{ width: '70%', flexShrink: 0 }}>
     {name}
    </Typography>
    <Typography
     sx={{ width: '15%', color: 'text.secondary', textAlign: 'end' }}
    >
     {sets + 'x' + reps}
    </Typography>
    <Typography
     onClick={() => openDialog(dayId, id, 'newProgressDialog', currentProgress)}
     sx={{ width: '15%', textAlign: 'end' }}
    >
     {currentProgress}
    </Typography>
   </AccordionSummary>
   <AccordionDetails>
    <Grid container>
     <Grid item>
      <p>Progress tracking:</p>
     </Grid>
     <Grid item container direction='row' spacing={1}>
      {progress.map((p) => (
       <Grid key={`${id}-${p}`} item>
        <p>{p}</p>
       </Grid>
      ))}
     </Grid>
     <Grid
      item
      container
      direction='row'
      alignItems='center'
      justifyContent='space-between'
     >
      <CommentSection
       comments={comments}
       dayIndex={dayIndex}
       exerciseIndex={exerciseIndex}
       id={id}
      />
     </Grid>
    </Grid>
   </AccordionDetails>
  </Accordion>
 );
};

export default ExerciseAccordion;
