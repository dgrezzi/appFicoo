import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BtnEdit from '../../../components/BtnEdit/intex';
import InputTxt from '../../../components/InputTxt';
import { VARS } from '../../../constants/VARS';
import { AuthContext } from '../../../contexts/auth';
import handleMpe from '../../../functions/handleMpe';
import styles from '../../../styles/styles';

export default function NewMpe() {
  const { dataContext, locale } = useContext(AuthContext);

  let dic = require('../../../dic/lang.json');
  let lang = dic[locale];

  // const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <BtnEdit
          onPress={async () => {
            if (post) {
              data = {
                user: dataContext.user,
                // title: title ? title : null,
                post: post,
                storageData: dataContext.storageData,
              };
              handleMpe(data);
              setPost('');
              navigation.goBack();
            }
          }}
          label={lang.post}
          labelColor={VARS.color.blue}
          color={VARS.color.whiteDark}
          icon="pencil"
          iconColor={VARS.color.blue}
          iconSize={VARS.size.icons * 0.8}
        />
      ),
    });
  }, [navigation, post, locale]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={[
        styles.keyboardAvoidingView,
        {
          backgroundColor: VARS.color.white,
        },
      ]}>
      <TouchableWithoutFeedback
        style={{ flex: 1, backgroundColor: 'red' }}
        onPress={() => Keyboard.dismiss()}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.container,
              { justifyContent: 'flex-start', paddingVertical: 20, gap: 15 },
            ]}>
            {/* <InputTxt
              placeholder={lang.newPostLabelTitle}
              value={title}
              maxLength={50}
              security={false}
              onChangeText={txt => {
                setTitle(txt);
              }}
            /> */}
            <InputTxt
              placeholder={lang.newPostLabelContent}
              value={post}
              security={false}
              multiline={true}
              minHeight={150}
              maxLength={1000}
              onChangeText={txt => {
                setPost(txt);
              }}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
