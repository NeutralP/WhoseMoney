import { createBrowserRouter } from 'react-router-dom';
import { add_axios_401_interceptor } from './axios.js';
import MainLayout from './components/MainLayout.jsx';
import SignIn from './views/SignIn.jsx';
import SignUp from './views/SignUp.jsx';
import ReceiptManagement from './views/ReceiptManagement.jsx';
import ExpenseManagement from './views/ExpenseManagement.jsx';
import Dashboard from './views/Dashboard.jsx';
import Profile from './views/Profile.jsx';
import NotFound404 from './views/NotFound404.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/receipts-management',
        element: <ReceiptManagement />,
      },
      {
        path: '/expenses-management',
        element: <ExpenseManagement />,
      },
      {
        path: '*',
        element: <NotFound404 />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

add_axios_401_interceptor(router);

export default router;
