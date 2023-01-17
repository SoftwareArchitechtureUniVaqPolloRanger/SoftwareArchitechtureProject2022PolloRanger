import SignIn from './Signin'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Consumer from './Consumer/Consumer';
import { Consumption } from './Consumer/components/Consumption';
import { Availability } from './Consumer/components/Availability';
import { Cost } from './Consumer/components/Cost';
import Admin from './Admin/Admin';
import { ProtectedComponent } from './Auth/ProtectedComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/consumer",
    element: <ProtectedComponent><Consumer /></ProtectedComponent>,
    children: [{
      path: "consumption",
      element: <Consumption />
    },
    {
      path: "cost",
      element: <Cost />
    },
    {
      path: "availability",
      element: <Availability />
    }]
  },
  {
    path: "/admin",
    element: <Admin />,
  }
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
