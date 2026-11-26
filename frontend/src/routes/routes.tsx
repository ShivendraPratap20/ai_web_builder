import { createBrowserRouter, } from 'react-router';
import MainLayout from './MainLayout';
import Home from '../pages/Home';
import AddProject from '../pages/AddProject';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/dashboard",
        element: <div><h1>This is dashboard</h1></div>
      },
      {
        path: "/addProject",
        element: <AddProject/>
      }
    ]
  },
]);

export default router;