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
    alert('Preencha todos os campos');
    return;
  }
  if (pwd.length <= 6) {
    alert('A senha deve ter pelo menos 6 caracteres');
    return;
  }
}
