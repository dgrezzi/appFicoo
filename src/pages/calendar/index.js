import React from 'react';
import { FlatList, View } from 'react-native';
import Date from '../../components/Calendar/Date';
import CalendarIten from '../../components/Calendar/Item';
import calendarStyles from '../../styles/calendarStyles';
import globalStyles from '../../styles/globalStyles';

export default function Calendar() {
  return (
    <View style={[globalStyles.container, globalStyles.space]}>
      <View style={calendarStyles.dateContainer}>
        <Date date="12" />
        <Date date="13" />
        <Date date="14" />
      </View>
      <FlatList
        style={calendarStyles.programContainer}
        data={item}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CalendarIten
            data={item}
            deleteRoom={() => deleteRoom(item.owner, item._id)}
          />
        )}
      />
    </View>
  );
}

const item = [
  {
    id: 1,
    title: 'What is Lorem Ipsum?',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    time: '9:00',
  },
  {
    id: 2,
    title: 'Lorem Ipsum part 2',
    description:
      'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
    time: '10:00',
  },
  {
    id: 3,
    title: 'Lorem Ipsum part 3',
    description:
      'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
    time: '11:00',
  },
  {
    id: 4,
    title: 'Lorem Ipsum part 4',
    description:
      'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    time: '13:00',
  },
];
