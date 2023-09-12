import { Alert } from 'react-native';
import handleSignIn from '../functions/handleSignIn';
import handleSignUp from '../functions/handleSignUp';

export default function validInputSign(login, email, pwd, name) {
  if (login && email && pwd.length >= 6) {
    handleSignIn(email, pwd);
    return;
  }
  if (!login && name && email && pwd.length >= 6) {
    handleSignUp(name, email, pwd);
    return;
  }
  if (!login && (!name || !email)) {
    Alert.alert('Atenção', 'Preencha todos os campos');
    return;
  }
  if (pwd.length <= 6) {
    Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres');
    return;
  }
}
