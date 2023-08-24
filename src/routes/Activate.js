import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import About from '../pages/about';
import MyTabs from './MyTabs';

export default function Activate() {
  const { active } = useContext(AuthContext);
  return active ? <MyTabs /> : <About />;
}
