import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [platforms] = useState([
    {
      name: "google",
      icon: <BsGoogle />,
      text: "구글 계정으로 로그인"
    },
    {
      name: "facebook",
      icon: <FaFacebookF />,
      text: "페이스북 계정으로 로그인"
    } 
  ]);
  const [user, setUser] = useState();
  const [popUp, setPopUp] = useState(false);
  
  const goToLogin = (user) => {
    setPopUp(false);
    login(user);
  }

  useEffect(() => {
    onUserStateChange(user => {
      // console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user, popUp, platforms, uid: user && user.uid,
        setPopUp, login, logout, goToLogin
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}