import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Slider.scss';
import DaySlide from './DaySlide';
import { useState } from 'react';
import AddNewProgressDialogComponent from '../Dialogs/AddNewProgressDialogComponent';
import { useUpdateTraining } from '../../queryHooks/useCurrentTrainingData';

export interface Exercise {
 id: string;
 name: string;
 sets: number;
 reps: number;
 progress: number[];
 comments: string[];
}

export interface TrainingDay {
 id: string;
 name: string;
 exercises: Exercise[];
}

export interface Training {
 id: string;
 userId: string;
 name?: string;
 days: TrainingDay[];
}

export interface SwiperComponentProps {
 trainingData: Training | undefined;
}

const SwiperComponent = ({ trainingData }: SwiperComponentProps) => {
 const [dayId, setDayId] = useState<string>();
 const [exerciseId, setExerciseId] = useState<string>();
 const [currentValue, setCurrentValue] = useState<number>(0);
 const [isAddNewProgressDialogOpened, setIsAddNewProgressDialogOpened] =
  useState<boolean>(false);
 const errorText = 'Cannot be empty or 0 or';

 const { mutate: updateTraining } = useUpdateTraining();

 const openDialog = (
  dayId: string,
  exerciseId: string,
  dialogId: string,
  current?: number
 ) => {
  setDayId(dayId);
  current && setCurrentValue(+current);
  setExerciseId(exerciseId);
  dialogId == 'newProgressDialog' && setIsAddNewProgressDialogOpened(true);
 };

 const closeDialog = () => {
  setIsAddNewProgressDialogOpened(false);
 };

 const progressArrayRemoveDuplicates = (progress: number[]): number[] => {
  return progress.reduce(
   (cleanProgressArray, progressItem) =>
    cleanProgressArray.includes(progressItem)
     ? cleanProgressArray
     : [...cleanProgressArray, progressItem],
   [] as number[]
  );
 };

 const setNewProgressValue = (newValue: number) => {
  if (!trainingData || !newValue) return;
  const trainingDataCopy = { ...trainingData };
  const dayToEditIndex = trainingDataCopy.days.findIndex(
   (day) => day.id === dayId
  );
  const exerciseIndex = trainingData.days[dayToEditIndex].exercises.findIndex(
   (e) => e.id === exerciseId
  );
  const progressCopy =
   trainingDataCopy.days[dayToEditIndex].exercises[exerciseIndex].progress;
  progressCopy.push(newValue);
  const progressWithoutDuplicates = progressArrayRemoveDuplicates(progressCopy);
  trainingDataCopy.days[dayToEditIndex].exercises[exerciseIndex].progress =
   progressWithoutDuplicates;
  updateTraining(trainingDataCopy);
  closeDialog();
 };

 return (
  <Swiper centeredSlides={false} noSwipingClass='noSwap' className='mySwiper'>
   {trainingData?.days.map((day, index) => (
    <SwiperSlide key={day.id} className='swiperSlide'>
     <DaySlide openDialog={openDialog} day={day} dayIndex={index}></DaySlide>
    </SwiperSlide>
   ))}
   {isAddNewProgressDialogOpened && (
    <AddNewProgressDialogComponent
     closeDialog={closeDialog}
     isDialogOpen={isAddNewProgressDialogOpened}
     currentValue={currentValue}
     dayId={dayId}
     exerciseId={exerciseId}
     setNewProgressValue={setNewProgressValue}
     errorText={errorText}
    />
   )}
  </Swiper>
 );
};

export default SwiperComponent;
