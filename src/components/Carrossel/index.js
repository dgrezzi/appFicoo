import { ScrollView, Text, View } from 'react-native';
import Card from '../Card';

export default function Carrossel(props) {
  const dados = props.data;

  return (
    <View style={{ gap: 5, paddingHorizontal: 0 }}>
      <Text
        style={{
          fontFamily: 'Abel',
          fontSize: 20,
          letterSpacing: 1,
          marginHorizontal: 15,
        }}>
        {props.label}
      </Text>
      <ScrollView
        contentContainerStyle={{
          columnGap: 5,
          marginHorizontal: 15,
        }}
        horizontal={true}>
        {dados.map((number, index) => (
          <Card key={index} image={number} />
        ))}
      </ScrollView>
    </View>
  );
}
