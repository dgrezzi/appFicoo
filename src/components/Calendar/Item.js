import { Text, TouchableOpacity, View } from 'react-native';
import calendarStyles from '../../styles/calendarStyles';
import globalStyles from '../../styles/globalStyles';

export default function CalendarIten(props) {
  return (
    <View style={[calendarStyles.itenContainer]}>
      <View style={[calendarStyles.date]}>
        <Text style={globalStyles.txtDarkSmall}>{props.data.time}</Text>
      </View>
      <View style={calendarStyles.program}>
        <Text style={globalStyles.txtDarkBoldLarge}>{props.data.title}</Text>
        <Text style={globalStyles.txtDarkSmall}>{props.data.description}</Text>
        <View style={calendarStyles.tagContainer}>
          <TouchableOpacity style={[calendarStyles.tag, calendarStyles.tag1]}>
            <Text style={globalStyles.txtDarkSmall}>Tag1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[calendarStyles.tag, calendarStyles.tag2]}>
            <Text style={globalStyles.txtLightSmall}>Tag2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[calendarStyles.tag, calendarStyles.tag3]}>
            <Text style={globalStyles.txtDarkSmall}>Tag3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[calendarStyles.tag, calendarStyles.tag4]}>
            <Text style={globalStyles.txtDarkSmall}>Tag4</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
