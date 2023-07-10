import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { APP_VARS } from '../../constants/APP_VARS';

function FabButton({ setVisible, userStatus }) {
  const navigation = useNavigation();

  function handleNavigateButton() {
    userStatus ? setVisible() : navigation.navigate('Perfil');
  }

  return (
    <TouchableOpacity
      style={styles.containerButton}
      activeOpacity={0.9}
      onPress={handleNavigateButton}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

export default FabButton;

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: APP_VARS.color.activeIcon,
    width: APP_VARS.size.icons * 1.6,
    height: APP_VARS.size.icons * 1.6,
    borderRadius: APP_VARS.size.icons,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '2%',
    right: '4%',
  },
  text: {
    fontSize: APP_VARS.size.icons,
    color: APP_VARS.color.white,
  },
});
