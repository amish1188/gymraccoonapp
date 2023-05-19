import axios from 'axios';
import { useQuery } from 'react-query';
import { ExerciseItem, ExerciseSubPart } from '../Pages/Exercises/ExerciseList';
import { API_URL } from './settings';

const getAllExercisesForBodyPartGroup = async ({ queryKey }: any) => {
 const [, bodyPart] = queryKey;
 return await axios.get(
  `${API_URL}Exercise/GetAllExercisesForBodyPartGroup/${bodyPart}`
 );
};

export const useGetAllExercisesForBodyPartGroup = (bodyPart: string) => {
 return useQuery([bodyPart, bodyPart], getAllExercisesForBodyPartGroup, {
  staleTime: Infinity
 });
};

export const useGetExercise = (
 bodyPart: string,
 subPart: string,
 name: string
): ExerciseItem | undefined => {
 const { data } = useQuery(
  [bodyPart, bodyPart],
  getAllExercisesForBodyPartGroup,
  { staleTime: Infinity }
 );
 if (data) {
  const exList = data?.data.exercisesList as ExerciseSubPart;
  const ex = exList[subPart].find((exercise) => exercise.name === name);
  return ex;
 }
};
