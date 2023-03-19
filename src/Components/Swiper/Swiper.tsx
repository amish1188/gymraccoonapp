import { Swiper, SwiperSlide } from 'swiper/react';
import { Training } from '../../context/CurrentTrainingContext';
import 'swiper/css';
import './Slider.scss';
import DaySlide from './DaySlide';
import { useState } from 'react';
import AddNewProgressDialogComponent from '../Dialogs/AddNewProgressDialogComponent';
import { useAddCurrentTrainingDataProgress } from '../../queryHooks/useCurrentTrainingData';
import AddNewCommentDialog from '../Dialogs/AddNewCommentDialog';

export interface SwiperComponentProps {
 trainingData: Training;
}

const SwiperComponent = ({ trainingData }: SwiperComponentProps) => {
 const [dayId, setDayId] = useState<number>();
 const [exerciseId, setExerciseId] = useState<string>();
 const [currentValue, setCurrentValue] = useState<number>(0);
 const [isAddNewProgressDialogOpened, setIsAddNewProgressDialogOpened] =
  useState<boolean>(false);
 const [isAddNewCommentDialogOpened, setIsAddNewCommentDialogOpened] =
  useState<boolean>(false);
 const errorText = 'Cannot be empty or 0';
 const emptyStringErrorText = 'Cannot be empty';

 const { mutate: updateTraining } = useAddCurrentTrainingDataProgress();

 const openDialog = (
  dayId: number,
  exerciseId: string,
  dialogId: string,
  current?: number
 ) => {
  setDayId(dayId);
  current && setCurrentValue(+current);
  setExerciseId(exerciseId);
  dialogId == 'newProgressDialog' && setIsAddNewProgressDialogOpened(true);
  dialogId == 'newCommentDialog' && setIsAddNewCommentDialogOpened(true);
 };

 const closeDialog = () => {
  setIsAddNewProgressDialogOpened(false);
  setIsAddNewCommentDialogOpened(false);
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

 const setNewComment = (newComment: string) => {
  if (!trainingData || !newComment) return;
  const trainingDataCopy = { ...trainingData };
  const dayToEditIndex = trainingDataCopy.days.findIndex(
   (day) => day.id === dayId
  );
  const exerciseIndex = trainingData.days[dayToEditIndex].exercises.findIndex(
   (e) => e.id === exerciseId
  );
  const commentsCopy =
   trainingDataCopy.days[dayToEditIndex].exercises[exerciseIndex].comments;
  commentsCopy.push(newComment);
  trainingDataCopy.days[dayToEditIndex].exercises[exerciseIndex].comments =
   commentsCopy;
  updateTraining(trainingDataCopy);
  closeDialog();
 };

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
   {isAddNewCommentDialogOpened && (
    <AddNewCommentDialog
     closeDialog={closeDialog}
     isDialogOpen={isAddNewCommentDialogOpened}
     setNewCommentValue={setNewComment}
     errorText={emptyStringErrorText}
    />
   )}
  </Swiper>
 );
};

export default SwiperComponent;
