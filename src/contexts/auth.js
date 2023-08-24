import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext({});

import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [dataContext, setDataContext] = useState({});
  const [locale, setLocale] = useState('pt');
  const [active, setActive] = useState(false);

  const activationPass = 'lc5816qd2';

  useEffect(() => {
    let dataUser = storage.getString('user');
    dataUser ? setDataContext(JSON.parse(dataUser)) : setDataContext({});
    let dataLocale = storage.getString('locale');
    dataLocale ? setLocale(JSON.parse(dataLocale)) : setLocale('pt');
    let dataActive = storage.getString('active');
    if (dataActive == activationPass) {
      setActive(true);
    }
    const listner = storage.addOnValueChangedListener(key => {
      const dataChanged = storage.getString(key);
      if (key == 'user') {
        dataChanged
          ? setDataContext(JSON.parse(dataChanged))
          : setDataContext({});
      }
      if (key == 'load') {
        dataChanged ? setLoading(JSON.parse(dataChanged)) : setLoading(false);
      }
      if (key == 'locale') {
        dataChanged ? setLocale(JSON.parse(dataChanged)) : setLocale('pt');
      }
      if (key == 'active') {
        setActive(false);
        if (dataChanged == activationPass) {
          setActive(true);
        }
      }
    });
    return () => {
      listner.remove();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setDataContext,
        dataContext,
        setLoading,
        loading,
        locale,
        active,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
