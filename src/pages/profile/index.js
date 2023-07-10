import React, { useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import avatar from '../../../src/assets/avatarM.jpg';
import { APP_VARS } from '../../constants/APP_VARS';
import { AuthContext } from '../../contexts/auth';
import handleSignOut from '../../functions/handleSignOut';
import globalStyles from '../../styles/globalStyles';
import profileStyles from '../../styles/profileStyles';

export default function Profile() {
  const { dataContext, setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <View style={profileStyles.container}>
      {!dataContext.user.photoURL && (
        <Image style={profileStyles.avatar} source={avatar} />
      )}
      {dataContext.user.photoURL && (
        <Image
          style={profileStyles.avatar}
          source={dataContext.user.photoURL}
        />
      )}
      <Text style={globalStyles.txtDarkBold}>
        {dataContext.user.displayName}
      </Text>
      <View style={profileStyles.userData}>
        <Fontisto
          style={profileStyles.icon}
          name="email"
          color={APP_VARS.color.activeIcon}
          size={APP_VARS.size.icons}
        />
        <Text style={globalStyles.txtDark}>{dataContext.user.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          handleSignOut();
        }}
        style={globalStyles.btnBlue}>
        <Text style={globalStyles.txtLight}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
