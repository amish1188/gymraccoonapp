import { Swiper, SwiperSlide } from 'swiper/react';
import {
 CurrentTrainingContext,
 Training
} from '../../context/CurrentTrainingContext';
import 'swiper/css';
import './Slider.scss';
import DaySlide from './DaySlide';
import { useContext, useState } from 'react';
import DialogComponent from '../Dialog';
import { useAddCurrentTrainingDataProgress } from '../../queryHooks/useCurrentTrainingData';

export interface SwiperComponentProps {
 trainingData: Training;
}

const SwiperComponent = ({ trainingData }: SwiperComponentProps) => {
 const [dayId, setDayId] = useState<number>();
 const [exerciseId, setExerciseId] = useState<string>();
 const [currentValue, setCurrentValue] = useState<number>(0);
 const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

 const { mutate: updateTraining } = useAddCurrentTrainingDataProgress();

 const openDialog = (dayId: number, exerciseId: string, current: number) => {
  if (!current) return;
  setDayId(dayId);
  setCurrentValue(+current);
  setExerciseId(exerciseId);
  setIsDialogOpen(true);
 };

 const closeDialog = () => {
  setIsDialogOpen(false);
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
  if (!trainingData) return;
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

 /* {dayId && exerciseId && currentValue ? (
    <DialogComponent
     dayId={dayId}
     exerciseId={exerciseId}
     currentValue={currentValue}
     isDialogOpen={isDialogOpen}
     closeDialog={closeDialog}
    />
   ) : null}*/

 return (
  <Swiper centeredSlides={false} noSwipingClass='noSwap' className='mySwiper'>
   {trainingData?.days.map((day) => (
    <SwiperSlide key={day.id} className='swiperSlide'>
     <DaySlide
      setNewProgressValue={setNewProgressValue}
      openDialog={openDialog}
      day={day}
     ></DaySlide>
    </SwiperSlide>
   ))}
   {isDialogOpen && (
    <DialogComponent
     closeDialog={closeDialog}
     isDialogOpen={isDialogOpen}
     currentValue={currentValue}
     dayId={dayId}
     exerciseId={exerciseId}
     setNewProgressValue={setNewProgressValue}
    />
   )}
  </Swiper>
 );
};

export default SwiperComponent;
