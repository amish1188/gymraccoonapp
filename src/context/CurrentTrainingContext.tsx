import React, { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

type UseQueryStatus = 'idle' | 'loading' | 'error' | 'success';

interface CurrentTrainingContext {
 currentProgressValue: number | null;
 trainingData: Training | null;
 status: UseQueryStatus;
 updateTrainingDayExercises: (id: number, exercisesList: Exercise[]) => void;
}

type Props = {
 children?: React.ReactNode;
};

export interface Exercise {
 id: string;
 name: string;
 sets: number;
 reps: number;
 progress: number[];
 comments: string[];
}

export interface TrainingDay {
 id: number;
 name: string;
 exercises: Exercise[];
}

export interface Training {
 id: string;
 userId: string;
 name?: string;
 days: TrainingDay[];
}

/* const tr: Training = {
 id: '30',
 userId: '30',
 name: 'training 1',
 days: [
  {
   name: 'Day 1',
   id: 1,
   exercises: [
    {
     name: 'Barbell bench press',
     id: 1,
     sets: 4,
     reps: 10,
     progress: [20, 22.5, 30, 40, 50, 60, 70, 80, 90],
     comments: ['Make sure to spread those arms', 'Ass hurts so badly']
    },
    {
     name: 'Incline dumdbell flyers',
     id: 2,
     sets: 3,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    },
    {
     name: 'Decline dumbbell bench press',
     id: 3,
     sets: 3,
     reps: 12,
     progress: [20, 22.5],
     comments: []
    }
   ]
  },
  {
   name: 'Day 2',
   id: 2,
   exercises: [
    {
     name: 'Deadlift',
     id: 4,
     sets: 4,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    },
    {
     name: 'Dumbbell Bulgarian',
     id: 5,
     sets: 4,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    },
    {
     name: 'Seated cable row neutral grip',
     id: 6,
     sets: 4,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    }
   ]
  },
  {
   name: 'Day 3',
   id: 3,
   exercises: [
    {
     name: 'Incline dumbbell',
     id: 7,
     sets: 4,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    },
    {
     name: 'Low cable fly',
     id: 8,
     sets: 3,
     reps: 12,
     progress: [20, 22.5],
     comments: []
    },
    {
     name: 'Plate loaded chest',
     id: 9,
     sets: 4,
     reps: 10,
     progress: [20, 22.5],
     comments: []
    }
   ]
  }
 ]
}; */

const CurrentTrainingContext = createContext<CurrentTrainingContext | null>(
 null
);

const CurrentTrainingProvider: React.FC<Props> = ({ children }) => {
 const [trainingData, setTrainingData] = useState<Training | null>(null);
 const { status } = useQuery('get-current-training', () =>
  getData('7E4D171A-B06D-11ED-B99C-E1CF9FF5D58B')
 );
 const [currentProgressValue, setCurrentProgressValue] = useState<number>(0);
 const [dayId, setDayId] = useState<number>();
 const [exerciseId, setExerciseId] = useState<number>();

 const getData = async (id: string) => {
  const data = await axios.post(
   'https://gymraccoon.azurewebsites.net/Training/GetCurrentTraining',
   {},
   { params: { currentTrainingId: id } }
  );
  setTrainingData(data.data);
 };

 const updateData = async (training: Training) => {
  try {
   const data = await axios.post(
    'https://gymraccoon.azurewebsites.net/Training/UpdateCurrentTraining',
    training
   );

   console.log(data);
  } catch (error) {
   console.log(error);
  }
 };

 const updateTrainingDayExercises = (id: number, exercisesList: Exercise[]) => {
  // currentTraining.days[index].exercises
  const dayToUpdate = trainingData?.days.findIndex(
   (day: TrainingDay) => day.id == id
  );
  if (dayToUpdate != null && trainingData) {
   const trainingDataCopy = { ...trainingData };
   trainingDataCopy.days[dayToUpdate].exercises = exercisesList;
   setTrainingData(trainingDataCopy);
  }
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

 return (
  <>
   <CurrentTrainingContext.Provider
    value={{
     trainingData,
     currentProgressValue,
     status,
     updateTrainingDayExercises
    }}
   >
    {children}
   </CurrentTrainingContext.Provider>
  </>
 );
};

export { CurrentTrainingProvider, CurrentTrainingContext };
