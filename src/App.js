import './App.css';

//functions import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//component import 
import Navbar from './component/navbar/Navbar';
import Home from './pages/home/Home';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import {AuthProvider} from './authContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path: "signin",
          element: <SignIn />
        },
        {
          path: "signup",
          element: <SignUp />
        },
      ]
    }
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

  );
}

export default App;
