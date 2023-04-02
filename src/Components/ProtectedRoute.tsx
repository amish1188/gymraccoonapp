import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
 isAuth: boolean;
 children: React.ReactNode;
}

const ProtectedRoute = ({ isAuth, children }: IProtectedRoute) => {
 if (!isAuth) {
  return <Navigate to='/' replace />;
 }
 return <>{children}</>;
};

export default ProtectedRoute;
