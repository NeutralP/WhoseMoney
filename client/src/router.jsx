import { createBrowserRouter } from 'react-router-dom';
import { add_axios_401_interceptor } from './axios.js';
import ExpenseManagement from './components/ExpenseManagement.jsx';

const router = createBrowserRouter([
  {
    path: '/expense-management',
    element: <ExpenseManagement/>
  }
]);

add_axios_401_interceptor(router);

export default router;
