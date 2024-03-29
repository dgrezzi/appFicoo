import firestore from '@react-native-firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [dataContext, setDataContext] = useState({});
  const [locale, setLocale] = useState('pt');
  const [active, setActive] = useState(false);
  const [disable, setDisable] = useState(false);
  const [mpe, setMpe] = useState(false);
  const [lgpd, setLgpd] = useState('');
  const [activationPass, setActivationPass] = useState('Lc5816qd5');

  useEffect(() => {
    getActivationCode();
    let dataUser = storage.getString('user');
    dataUser ? setDataContext(JSON.parse(dataUser)) : setDataContext({});
    let dataLocale = storage.getString('locale');
    dataLocale ? setLocale(JSON.parse(dataLocale)) : setLocale('pt');
    let dataActive = storage.getString('active');
    dataActive == activationPass ? setActive(true) : setActive(false);
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
        dataChanged == activationPass ? setActive(true) : setActive(false);
      }
    });
    if (disable == true) storage.delete('active');
    return () => {
      listner.remove();
    };
  }, [disable, activationPass, active]);

  async function getActivationCode() {
    // return;
    await firestore()
      .collection('configs')
      .doc('ativacao')
      .get()
      .then(result => {
        setActivationPass(result._data?.value);
        setDisable(result._data?.disable);
        setMpe(result._data?.mpe);
        setLgpd(result._data?.lgpd);
      })
      .catch(err => {
        console.error('erro no banco:', err);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        setDataContext,
        dataContext,
        setLoading,
        loading,
        locale,
        active,
        activationPass,
        getActivationCode,
        mpe,
        setMpe,
        lgpd,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
