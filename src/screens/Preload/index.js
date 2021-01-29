import React, {useEffect, useContext} from 'react';
import {StatusBar} from 'react-native';
import NavigationBar from 'react-native-navbar-color';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {UserContext} from '../../contexts/UserContext';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        let json = await Api.checkToken();

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
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
    NavigationBar.setColor('#63c2d1');
  }, [navigation, userDispatch]);

  return (
    <Container>
      <StatusBar backgroundColor="#63c2d1" barStyle="light-content" />
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFF" />
    </Container>
  );
};
