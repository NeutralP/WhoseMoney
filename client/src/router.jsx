import { createBrowserRouter } from 'react-router-dom';
import { add_axios_401_interceptor } from './axios.js';
import MainLayout from './components/MainLayout.jsx';
import SignIn from './views/SignIn.jsx';
import SignUp from './views/SignUp.jsx';
import ReceiptManagement from './views/ReceiptManagement.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/receipts-management',
        element: <ReceiptManagement />,
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
