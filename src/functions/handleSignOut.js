import auth from '@react-native-firebase/auth';
import setAuthContext from './setAuthContext';

export default function handleSignOut() {
  setAuthContext('');
  auth()
    .signOut()
    .then(() => {})
    .catch(() => {});
}
