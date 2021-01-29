import React, {useState, useContext} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [passwordConfirmationField, setPasswordConfirmationField] = useState(
    '',
  );

  const handleSignClick = async () => {
    if (nameField && emailField && passwordField && passwordConfirmationField) {
      let json = await Api.signUp(
        nameField,
        emailField,
        passwordField,
        passwordConfirmationField,
      );

      if (json.token) {
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar,
          },
        });

        navigation.reset({
          routes: [
            {
              name: 'MainTab',
            },
          ],
        });
      } else {
        alert(JSON.stringify(json.error));
      }
    } else {
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [
        {
          name: 'SignIn',
        },
      ],
    });
  };

  return (
    <Container>
      <StatusBar backgroundColor="#63c2d1" barStyle="dark-content" />

      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />
        <SignInput
          IconSvg={EmailIcon}
          placeholder="E-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Senha"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />
        <SignInput
          IconSvg={LockIcon}
          placeholder="Confirme a senha"
          value={passwordConfirmationField}
          onChangeText={(t) => setPasswordConfirmationField(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
