import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { APP_VARS } from '../../../constants/APP_VARS';
import { AuthContext } from '../../../contexts/auth';
import handlePost from '../../../functions/handlePost';
import globalStyles from '../../../styles/globalStyles';
import postStyle from '../../../styles/postStyle';

export default function NewPost() {
  const { dataContext, locale } = useContext(AuthContext);

  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={globalStyles.btnBlue}
          onPress={async () => {
            if (title && post) {
              data = {
                user: dataContext.user,
                title: title,
                post: post,
                storageData: dataContext.storageData,
              };
              handlePost(data);
              setPost('');
              setTitle('');
              navigation.goBack();
            }
          }}>
          <Text style={globalStyles.txtLightSmall}>{lang.share}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, post, title, locale]);

  return (
    <View
      style={[globalStyles.container, globalStyles.center, globalStyles.space]}>
      <TextInput
        style={globalStyles.titleInput}
        placeholder={lang.postTitle}
        value={title}
        multiline={false}
        placeholderTextColor={APP_VARS.color.txtGray}
        onChangeText={txtTitle => {
          setTitle(txtTitle);
        }}
      />
      <TextInput
        style={postStyle.inputPost}
        placeholder={lang.postContent}
        value={post}
        multiline={true}
        maxLength={1000}
        placeholderTextColor={APP_VARS.color.txtGray}
        onChangeText={txtPost => {
          setPost(txtPost);
        }}
      />
    </View>
  );
}
