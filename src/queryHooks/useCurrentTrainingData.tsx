import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Training } from '../context/CurrentTrainingContext';

const getData = async ({ queryKey }: any) => {
 console.log(queryKey);
 const currentTrainingId = queryKey[1];
 return await axios.post(
  'https://raccoongymapi.azurewebsites.net//Training/GetCurrentTraining',
  {},
  { params: { currentTrainingId: currentTrainingId } }
 );
};

const updateTraining = async (trainingData: Training) => {
 return await axios.post(
  'https://raccoongymapi.azurewebsites.net//Training/UpdateCurrentTraining',
  trainingData
 );
};

export const useCurrentTrainingData = (currentTrainingId: string) => {
 return useQuery(['currentTraining', currentTrainingId], getData);
};

export const useAddCurrentTrainingDataProgress = () =>
 useMutation(updateTraining);
