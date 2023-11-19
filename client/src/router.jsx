import { createBrowserRouter } from 'react-router-dom';
import { add_axios_401_interceptor } from './axios.js';
import ExpenseManagement from './components/ExpenseManagement.jsx';
import MainLayout from './components/MainLayout.jsx';
import ReceiptsDetail from './views/ReceiptsDetail.jsx';

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
        path: '/expense-management',
        element: <ExpenseManagement />,
      },
    ],
  },
]);

add_axios_401_interceptor(router);

export default router;
