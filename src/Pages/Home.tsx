import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/authConfig';

import SwiperComponent from '../Components/Swiper/Swiper';
import { useCurrentTrainingData } from '../queryHooks/useCurrentTrainingData';

export const SignInButton = () => {
 const { instance } = useMsal();

 const handleLogin = (loginType: string) => {
  if (loginType === 'popup') {
   instance.loginPopup(loginRequest).catch((e: any) => {
    console.log(e);
   });
  }
 };
 return (
  <button onClick={() => handleLogin('popup')}>Sign in using Popup</button>
 );
};

export const Home = () => {
 // query
 const currentTrainingId = '7E4D171A-B06D-11ED-B99C-E1CF9FF5D58B';
 const { isLoading, data, isError, error } =
  useCurrentTrainingData(currentTrainingId);

 if (isError && error instanceof Error) return <div>{error.message}</div>;
 if (isLoading) return <div>Loading data</div>;

 return (
  <div>
   <SwiperComponent trainingData={data?.data} />
  </div>
 );
};
