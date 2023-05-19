import { useGetAllExercisesForBodyPartGroup } from '../../queryHooks/useExerciseData';

import './Exercises.scss';
import ExerciseListSubPartTitleAndAddNewButton from './ExerciseListSubPartTitleAndAddNewButton';
import ExerciseTitleCard from './ExerciseTitleCard';
import { useParams } from 'react-router-dom';

export interface ExerciseList {
 id: string;
 type: string;
 bodyPart: string;
 exercisesList: ExerciseSubPart;
}

export interface ExerciseSubPart {
 [part: string]: ExerciseItem[];
}

export interface ExerciseItem {
 description: string;
 id: string;
 name: string;
 thumbnailUrl: string;
 videoUrl: string;
}

const ExerciseList = () => {
 const { bodyPart } = useParams();

 const list = [
  'chest',
  'biceps',
  'triceps',
  'shoulders',
  'back',
  'hamstrings',
  'core',
  'quads',
  'calves'
 ];

 if (!bodyPart) return <div>wrong</div>;

 if (!list.includes(bodyPart)) return <div>wrong</div>;

 const { isLoading, data, isError, error } =
  useGetAllExercisesForBodyPartGroup(bodyPart);

 if (isError && error instanceof Error) return <div>{error.message}</div>;
 if (isLoading) return <div>Loading...</div>;
 return (
  <div>
   {Object.entries(data?.data.exercisesList as ExerciseSubPart).map(
    ([key, value]) => (
     <div className='card-container' key={key}>
      <ExerciseListSubPartTitleAndAddNewButton title={key} />
      {value.map((ex: ExerciseItem) => (
       <ExerciseTitleCard key={ex.id} exItem={ex} exSubType={key} />
      ))}
     </div>
    )
   )}
  </div>
 );
};

export default ExerciseList;
