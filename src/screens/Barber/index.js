import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';

import Api from '../../Api';

import {
  Container,
  Scroller,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  PageBody,
  UserInfoArea,
  ServiceArea,
  TestimonialArea,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
} from './styles';

import FavoriteIcon from '../../assets/favorite.svg';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    public_id: route.params.public_id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.public_id);

      if (json.error === '') {
        setUserInfo(json.data);
      } else {
        alert(JSON.stringify(json.error));
      }

      setLoading(false);
    };
    getBarberInfo();
  }, [userInfo.public_id]);

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Scroller>
        {userInfo.photos ? (
          <Swiper
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: 300}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            // eslint-disable-next-line react-native/no-inline-styles
            paginationStyle={{
              top: 30,
              right: 15,
              bottom: null,
              left: null,
            }}
            autoplay={true}>
            {userInfo.photos.map((item, key) => (
              <SwipeItem key={key}>
                <SwipeImage source={{uri: item.url}} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />

            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>

            <UserFavButton>
              <FavoriteIcon width="24" height="24" fill="#F00" />
            </UserFavButton>
          </UserInfoArea>

          <ServiceArea />

          <TestimonialArea />
        </PageBody>
      </Scroller>
    </Container>
  );
};
