import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import '~/styles/MainLayout.scss';
import { userStateContext } from '~/contexts/ContextProvider';
import axiosClient from '~/axios';
import useGlobalModalStore from '~/store/useGlobalModalStore';
import ConfirmModal from './ConfirmModal';

const MainLayout = () => {
  const [confirmModal] = useGlobalModalStore((state) => [state.confirmModal]);

  const { setCurrentUser, userToken } = userStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      axiosClient
        .get('/auth/me')
        .then(({ data }) => {
          const userInfo = data.data;
          setCurrentUser(userInfo);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, []);

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
          <Outlet />
        </>
      )}

      <ConfirmModal
        open={confirmModal.open}
        title={confirmModal.title}
        content={confirmModal.content}
        handleCancel={confirmModal.handleCancel}
        handleOk={confirmModal.handleOk}
      />
    </div>
  );
};

export default MainLayout;
