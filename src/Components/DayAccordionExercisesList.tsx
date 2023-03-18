import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useRef } from 'react';
import {
 CurrentTrainingContext,
 Exercise
} from '../context/CurrentTrainingContext';

interface DayAccordionExercisesListProps {
 exercisesList: Exercise[];
 dayId: number;
}

const DayAccordionExercisesList = ({
 exercisesList,
 dayId
}: DayAccordionExercisesListProps) => {
 const trainingContext = useContext(CurrentTrainingContext);
 const dragItem = useRef<number | null>(null);
 const dragOverItem = useRef<number | null>(null);

 const dragStart = (position: number) => {
  dragItem.current = position;
 };

 const dragEnter = (position: number) => {
  dragOverItem.current = position;
 };

 const drop = (itemId: number) => {
  console.log('started');
  if (dragItem.current != null && dragOverItem.current != null) {
   const listCopy = [...exercisesList];
   const currentDragItem = listCopy[dragItem.current];
   listCopy.splice(dragItem.current, 1);
   listCopy.splice(dragOverItem.current, 0, currentDragItem);
   trainingContext?.updateTrainingDayExercises(itemId, listCopy);
   dragItem.current = null;
   dragOverItem.current = null;
  }
 };

 return (
  <List sx={{ width: '90%' }} dense>
   {exercisesList.map((item, index) => (
    <ListItem
     key={item.id}
     draggable
     onDragStart={() => dragStart(index)}
     onDragEnter={() => dragEnter(index)}
     onDragEnd={() => drop(dayId)}
    >
     <ListItemText>{item.name}</ListItemText>
     <ListItemText style={{ textAlign: 'right' }}>{item.reps}</ListItemText>
    </ListItem>
   ))}
  </List>
 );
};

export default DayAccordionExercisesList;
