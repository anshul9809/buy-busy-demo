import './App.css';

//functions import
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//component import 
import Navbar from './component/Navbar';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import {AuthProvider} from './authContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children:[
        {
          index:true,
          element:<Navbar/>
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
