import { useNavigate } from 'react-router-dom';

import { CardActionArea, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';

import { ExerciseItem } from './ExerciseList';
import { editExerciseName } from './exerciseHelper';

type ExerciseTitleCardProps = {
 exSubType: string;
 exItem: ExerciseItem;
};

const ExerciseTitleCard = (props: ExerciseTitleCardProps) => {
 const navigate = useNavigate();

 const { exItem, exSubType } = props;
 const title = editExerciseName(exItem.name);

 const redirectTo = (path: string) => {
  const exerciseNameToArray = path.toLowerCase().split(' ');
  const exercisePath = exerciseNameToArray.join('-');
  navigate(`./${exercisePath.toLowerCase()}`);
 };

 return (
  <Card className='card'>
   <CardActionArea onClick={() => redirectTo(`${exSubType}/${exItem.name}`)}>
    <CardContent className='card-content'>
     <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
      {title}
     </Typography>
    </CardContent>
   </CardActionArea>
  </Card>
 );
};

export default ExerciseTitleCard;
