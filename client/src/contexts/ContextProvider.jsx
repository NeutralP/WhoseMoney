import { createContext, useContext, useState } from 'react';
import axiosClient from '~/axios';

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  fetchUser: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem('TOKEN') || ''
  );

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token);
  };

  const fetchUser = () => {
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
      });
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        fetchUser,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const userStateContext = () => useContext(StateContext);
