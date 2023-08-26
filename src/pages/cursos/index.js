import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { VARS } from '../../constants/VARS';
import styles from '../../styles/styles';
import { oficinas, painel } from './atividades';
import { Atividade, Aviso, Botoes } from './structure';

export default function Cursos() {
  const [activeAba, setActiveAba] = useState(1);

  const abaChange = state => {
    setActiveAba(state);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: VARS.color.white, paddingHorizontal: 0 },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={[
          styles.keyboardAvoidingView,
          {
            width: '100%',
            backgroundColor: 'transparent',
          },
        ]}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 6,
            paddingBottom: 20,
          }}>
          <Aviso />
          <Botoes abaChange={abaChange} />
          {activeAba == '1' &&
            painel.map((value, index) => {
              return (
                <Atividade
                  time={value.time}
                  title={value.title}
                  owner={value.owner}
                  id={value.id}
                />
              );
            })}

          {activeAba == '2' &&
            oficinas.map((value, index) => {
              return (
                <Atividade
                  time={value.time}
                  title={value.title}
                  owner={value.owner}
                  id={value.id}
                />
              );
            })}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
