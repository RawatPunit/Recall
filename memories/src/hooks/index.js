import { useContext, useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider'; // so that we dont to use provider again and aigain
import {
  editProfile,
  login as userLogin,
  register,
  fetchUserFriends,
} from '../api';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
  getItemInLocalStorage, fetchUserFriends
} from '../utils';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null); //-----------A (once resp is succes suser will be set)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        //get the user froom userToken
        const user = jwt(userToken);
        const response = await fetchUserFriends();

        let friends = [];
        if(response.success){
            friends = response.data.friends;
        }
        setUser({
            ...user,
            friends ,       //adding the friends property onto the object
        })
        setUser(user);
      }

      setLoading(false);
    };
    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if (response.success) {
      //------A
      setUser(response.data.user); // to reatin the data once logged in
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      //------A
      setUser(response.data.user); // to reatin the data once logged in
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: true,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };
  return {
    user,
    login,
    logout,
    loading,
    updateUser,
  };
};
