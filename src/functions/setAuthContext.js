import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function setAuthContext(data) {
  storage.set('user', JSON.stringify(data));
}
