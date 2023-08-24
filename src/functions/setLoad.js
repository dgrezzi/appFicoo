import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function setLoad(data) {
  storage.set('load', JSON.stringify(data));
}
