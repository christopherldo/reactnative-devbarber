import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {
  Container,
  SafeArea,
  AccountHeader,
  BackButton,
  HeaderText,
  InfoArea,
  UserHeader,
  UserAvatar,
  Avatar,
  Name,
  UserContact,
  Contact,
  ContactText,
  OptionsArea,
  Top,
  Option,
  OptionName,
  OptionInput,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

import Api from '../../Api';
import BackIcon from '../../assets/back.svg';
import EmailIcon from '../../assets/email.svg';
import PhoneIcon from '../../assets/phone.svg';
import PencilIcon from '../../assets/pencil.svg';

export default ({route}) => {
  const navigation = useNavigation();

  const info = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleBackClick = () => {
    navigation.goBack();
  };

  const handleUpdateUser = async () => {
    let res = await Api.update(
      name,
      email,
      phone,
      password,
      passwordConfirmation,
    );

    if (res.error === '') {
      navigation.goBack();
    } else {
      alert(JSON.stringify(res.error));
    }
  };

  const handleAvatarUpdate = async () => {
    let res = null;

    try {
      res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
    } catch (err) {}

    if (res) {
      let json = await Api.updateAvatar(res);

      if (json.error === '') {
        navigation.goBack();
      } else {
        alert(JSON.stringify(json.error));
      }
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="position">
        <SafeArea>
          <AccountHeader>
            <BackButton onPress={handleBackClick}>
              <BackIcon width="50" height="50" fill="#fff" />
            </BackButton>
            <HeaderText>Configurações da conta</HeaderText>
          </AccountHeader>

          <InfoArea>
            <UserHeader>
              <UserAvatar onPress={handleAvatarUpdate}>
                <Avatar source={{uri: info.avatar}} />
                <PencilIcon
                  height="30"
                  width="30"
                  fill="#000"
                  position="absolute"
                />
              </UserAvatar>
              <Name>
                {info.name[0]} {info.name[info.name.length - 1]}
              </Name>
            </UserHeader>

            <UserContact>
              <Contact>
                <EmailIcon width="20" height="20" fill="rgba(0, 0, 0, 0.2)" />
                <ContactText>{info.email}</ContactText>
              </Contact>

              {info.telephone && (
                <Contact>
                  <PhoneIcon width="20" height="20" fill="rgba(0, 0, 0, 0.2)" />
                  <ContactText>{info.telephone}</ContactText>
                </Contact>
              )}
            </UserContact>
          </InfoArea>

          <OptionsArea>
            <Top>
              <OptionName>Nome:</OptionName>
              <OptionInput
                onChangeText={(t) => {
                  setName(t);
                }}
                value={name}
              />
            </Top>

            <Option>
              <OptionName>Email:</OptionName>
              <OptionInput
                onChangeText={(t) => {
                  setEmail(t);
                }}
                value={email}
              />
            </Option>

            <Option>
              <OptionName>Telefone:</OptionName>
              <OptionInput
                onChangeText={(t) => {
                  setPhone(t);
                }}
                value={phone}
              />
            </Option>

            <Option>
              <OptionName>Senha:</OptionName>
              <OptionInput
                onChangeText={(t) => {
                  setPassword(t);
                }}
                value={password}
                secureTextEntry
              />
            </Option>

            <Option>
              <OptionName>Confirme a senha:</OptionName>
              <OptionInput
                onChangeText={(t) => {
                  setPasswordConfirmation(t);
                }}
                value={passwordConfirmation}
                secureTextEntry
              />
            </Option>
          </OptionsArea>

          <SubmitButton onPress={handleUpdateUser}>
            <SubmitButtonText>Salvar</SubmitButtonText>
          </SubmitButton>
        </SafeArea>
      </KeyboardAvoidingView>
    </Container>
  );
};
