import { CardActionArea, CardContent, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';

import './Exercises.scss';

const ExerciseCategories = () => {
 const navigate = useNavigate();
 const list = [
  'Chest',
  'Biceps',
  'Triceps',
  'Shoulders',
  'Back',
  'Hamstrings',
  'Core',
  'Quads',
  'Calves'
 ];

 const redirectTo = (path: string) => {
  navigate(`./${path.toLowerCase()}`);
 };

 return (
  <div className='card-container'>
   {list.map((l) => (
    <Card key={l} className='card'>
     <CardActionArea onClick={() => redirectTo(l)}>
      <CardContent className='card-content'>
       <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
        {l}
       </Typography>
      </CardContent>
     </CardActionArea>
    </Card>
   ))}
  </div>
 );
};

export default ExerciseCategories;
