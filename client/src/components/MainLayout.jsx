import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import '~/styles/MainLayout.scss';
import { userStateContext } from '~/contexts/ContextProvider';
import axiosClient from '~/axios';
import useGlobalModalStore from '~/store/useGlobalModalStore';
import ConfirmModal from './ConfirmModal';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';

const MainLayout = () => {
  const navigate = useNavigate();
  const [confirmModal] = useGlobalModalStore((state) => [state.confirmModal]);

  const { setCurrentUser, userToken, setUserToken } = userStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      axiosClient
        .get('/auth/me')
        .then(({ data }) => {
          if (data.message === 'Unauthorized') {
            navigate('/sign-in');
          } else {
            const userInfo = data.data;
            setCurrentUser(userInfo);
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('TOKEN');
            setUserToken(null);
          }
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/sign-in');
    }
  }, [userToken]);

  if (!userToken) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="main-layout h-screen overflow-hidden min-h-0 relative flex">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <Sidebar />
          <div className="app-container">
            <Navbar />
            <Outlet />
          </div>
        </>
      )}

      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        content={confirmModal.content}
        handleCancel={confirmModal.handleCancel}
        handleOk={confirmModal.handleOk}
      />

      <ToastContainer />
    </div>
  );
};

export default MainLayout;
