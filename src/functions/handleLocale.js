import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({ id: 'appFicoo' });

export default function handleLocale(data) {
  storage.set('locale', JSON.stringify(data));
}
