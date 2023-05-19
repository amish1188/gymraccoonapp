import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Program } from '../Components/Swiper/Swiper';
import { CommentDelete } from '../DbModels/CommentDelete';
import { CommentUpdate } from '../DbModels/CommentUpdate';
import { API_URL } from './settings';

const getCurrentProgram = async ({ queryKey }: any) => {
 const currentProgramId = queryKey[1];
 return await axios.post(
  `${API_URL}WorkoutProgram/GetCurrentProgram`,
  {},
  { params: { currentProgramId: currentProgramId } }
 );
};

const updateProgram = async (trainingProgram: Program) => {
 return await axios.post(
  `${API_URL}WorkoutProgram/UpdateCurrentProgram`,
  trainingProgram
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

export const useGetCurrentProgramData = (currentProgramId: string) => {
 return useQuery(['currentProgram', currentProgramId], getCurrentProgram);
};

export const useUpdateProgram = () => useMutation(updateProgram);

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
