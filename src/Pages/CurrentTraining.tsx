import SwiperComponent from '../Components/Swiper/Swiper';
import { useGetCurrentProgramData } from '../queryHooks/useCurrentTrainingData';

const CurrentTraining = () => {
 const currentTrainingId = '7E4D171A-B059-11ED-B99C-E1CF9FF5D58B';
 const { isLoading, data, isError, error } =
  useGetCurrentProgramData(currentTrainingId);

 if (isError && error instanceof Error) return <div>{error.message}</div>;
 if (isLoading) return <div>Loading data</div>;

 return (
  <>
   <SwiperComponent trainingData={data?.data} />
  </>
 );
};

export default CurrentTraining;
