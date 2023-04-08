import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useContext, useRef } from 'react';
import { Exercise } from './Swiper/Swiper';

interface DayAccordionExercisesListProps {
 exercisesList: Exercise[];
 dayId: number;
}

const DayAccordionExercisesList = ({
 exercisesList,
 dayId
}: DayAccordionExercisesListProps) => {
 const dragItem = useRef<number | null>(null);
 const dragOverItem = useRef<number | null>(null);

 const dragStart = (position: number) => {
  dragItem.current = position;
 };

 const dragEnter = (position: number) => {
  dragOverItem.current = position;
 };

 return (
  <List sx={{ width: '90%' }} dense>
   {exercisesList.map((item, index) => (
    <ListItem
     key={item.id}
     draggable
     onDragStart={() => dragStart(index)}
     onDragEnter={() => dragEnter(index)}
    >
     <ListItemText>{item.name}</ListItemText>
     <ListItemText style={{ textAlign: 'right' }}>{item.reps}</ListItemText>
    </ListItem>
   ))}
  </List>
 );
};

export default DayAccordionExercisesList;
