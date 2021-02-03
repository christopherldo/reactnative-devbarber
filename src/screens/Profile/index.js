import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {
  Container,
  Scroller,
  ProfileArea,
  UserHeader,
  Avatar,
  Name,
  UserContact,
  Contact,
  ContactText,
  OptionsArea,
  Top,
  Option,
  OptionText,
} from './styles';

import Api from '../../Api';

import EmailIcon from '../../assets/email.svg';
import PhoneIcon from '../../assets/phone.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import TodayIcon from '../../assets/today.svg';
import SearchIcon from '../../assets/search.svg';
import ProfileIcon from '../../assets/person.svg';
import PowerIcon from '../../assets/power.svg';

export default () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [logout, setLogout] = useState(false);

  const isFocused = useIsFocused();

  const handleScreenClick = (screenName, userInfo = null) => {
    if (userInfo) {
      navigation.navigate(screenName, info);
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleLogoutClick = async () => {
    setLogout(true);

    await Api.logout();

    navigation.reset({
      routes: [
        {
          name: 'Preload',
        },
      ],
    });
  };

  const getUserInfo = async (resetInfo = false) => {
    let res = await Api.read();

    if (res.error === '') {
      res.info.name = res.info.name.split(' ');
      res.info.avatar += `?${Date.now()}`;

      setInfo(res.info);
    } else {
      alert(res.error);
    }

    setLoading(false);
  };

  const onRefresh = () => {
    getUserInfo();
  };

  useEffect(() => {
    if (logout === false) {
      getUserInfo();
    }
  }, [isFocused, logout]);

  useEffect(() => {
    setLoading(true);
    getUserInfo(true);
  }, []);

  return (
    <Container>
      <>
        <ProfileArea>
          <Scroller
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            {info && (
              <>
                <UserHeader>
                  <Avatar source={{uri: info.avatar}} />
                  <Name>
                    {info.name[0]} {info.name[info.name.length - 1]}
                  </Name>
                </UserHeader>

                <UserContact>
                  <Contact>
                    <EmailIcon
                      width="20"
                      height="20"
                      fill="rgba(0, 0, 0, 0.2)"
                    />
                    <ContactText>{info.email}</ContactText>
                  </Contact>

                  {info.telephone && (
                    <Contact>
                      <PhoneIcon
                        width="20"
                        height="20"
                        fill="rgba(0, 0, 0, 0.2)"
                      />
                      <ContactText>{info.telephone}</ContactText>
                    </Contact>
                  )}
                </UserContact>
              </>
            )}
          </Scroller>

          <OptionsArea>
            <Top onPress={() => handleScreenClick('Favorites')}>
              <FavoriteIcon width="30" height="30" fill="#63c2d1" />
              <OptionText>Seus favoritos</OptionText>
            </Top>

            <Option onPress={() => handleScreenClick('Appointments')}>
              <TodayIcon width="30" height="30" fill="#63c2d1" />
              <OptionText>Seus agendamentos</OptionText>
            </Option>

            <Option onPress={() => handleScreenClick('Search')}>
              <SearchIcon width="30" height="30" fill="#63c2d1" />
              <OptionText>Buscar</OptionText>
            </Option>

            {info && (
              <Option onPress={() => handleScreenClick('Account', info)}>
                <ProfileIcon width="30" height="30" fill="#63c2d1" />
                <OptionText>Configurações da Conta</OptionText>
              </Option>
            )}

            <Option onPress={handleLogoutClick}>
              <PowerIcon width="30" height="30" fill="#f00" />
              <OptionText style={{color: '#f00'}}>Sair</OptionText>
            </Option>
          </OptionsArea>
        </ProfileArea>
      </>
    </Container>
  );
};
