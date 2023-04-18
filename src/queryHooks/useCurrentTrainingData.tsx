import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Training } from '../Components/Swiper/Swiper';
import { CommentDelete } from '../DbModels/CommentDelete';
import { CommentUpdate } from '../DbModels/CommentUpdate';

const API_URL = 'https://raccoongymapi.azurewebsites.net/';
// https://localhost:7121

const getData = async ({ queryKey }: any) => {
 const currentTrainingId = queryKey[1];
 return await axios.post(
  `${API_URL}WorkoutProgram/GetCurrentTraining`,
  {},
  { params: { currentTrainingId: currentTrainingId } }
 );
};

const updateTraining = async (trainingData: Training) => {
 return await axios.post(
  `${API_URL}WorkoutProgram/UpdateCurrentTraining`,
  trainingData
 );
};

const addExerciseComment = async (commentUpdate: CommentUpdate) => {
 return await axios.post(
  `${API_URL}WorkoutProgram/AddExerciseComment`,
  commentUpdate
 );
};

const deleteExerciseComment = async (commentDelete: CommentDelete) => {
 return await axios.delete(`${API_URL}WorkoutProgram/DeleteExerciseComment`, {
  data: commentDelete
 });
};

export const useCurrentTrainingData = (currentTrainingId: string) => {
 return useQuery(['currentTraining', currentTrainingId], getData);
};

export const useUpdateTraining = () => useMutation(updateTraining);
export const useAddExerciseComment = () => {
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: addExerciseComment,
  onSuccess: (data) => {
   queryClient.setQueryData(
    ['currentTraining', '7E4D171A-B059-11ED-B99C-E1CF9FF5D58B'],
    data
   );
  }
 });
};
export const useDeleteComment = () => {
 const queryClient = useQueryClient();
 return useMutation({
  mutationFn: deleteExerciseComment,
  onSuccess: (data) => {
   queryClient.setQueryData(
    ['currentTraining', '7E4D171A-B059-11ED-B99C-E1CF9FF5D58B'],
    data
   );
  }
 });
};
