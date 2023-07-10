import { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import calendarStyles from '../../styles/calendarStyles';
import globalStyles from '../../styles/globalStyles';

export default function Date(props) {
  const { locale } = useContext(AuthContext);
  let dic = require('../../dic/lang.json');
  let lang = dic[locale];

  return (
    <TouchableOpacity style={calendarStyles.buttonDate}>
      <Text style={globalStyles.txtDarkSmall}>{lang.dateMonth}</Text>
      <Text style={globalStyles.txtDarkBoldLarge}>{props.date}</Text>
    </TouchableOpacity>
  );
}
