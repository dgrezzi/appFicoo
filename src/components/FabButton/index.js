import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { VARS } from '../../constants/VARS';

function FabButton({ setVisible, userStatus }) {
  const navigation = useNavigation();

  function handleNavigateButton() {
    userStatus ? setVisible() : navigation.navigate('Perfil');
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: VARS.color.blue,
        width: VARS.size.icons * 1.6,
        height: VARS.size.icons * 1.6,
        borderRadius: VARS.size.icons,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '3%',
        right: '5%',
      }}
      activeOpacity={0.9}
      onPress={() => {
        handleNavigateButton();
      }}>
      <Ionicons
        name="add-outline"
        size={VARS.size.icons}
        color={VARS.color.white}
      />
    </TouchableOpacity>
  );
}

export default FabButton;
