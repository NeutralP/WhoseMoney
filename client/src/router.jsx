import { createBrowserRouter } from 'react-router-dom';
import { add_axios_401_interceptor } from './axios.js';
import MainLayout from './components/MainLayout.jsx';
import ReceiptManagement from './views/ReceiptManagement.jsx';
import ReceiptsDetail from './views/ReceiptsDetail.jsx';
import SignIn from './views/SignIn.jsx';
import SignUp from './views/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/receipts-detail',
        element: <ReceiptsDetail />,
      },
      {
        path: '/receipt-management',
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
