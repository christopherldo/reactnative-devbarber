import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

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
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  BackButton,
  LoadingIcon,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceChooseButton,
  ServiceChooseButtonText,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
} from './styles';

import FavoriteIcon from '../../assets/favorite.svg';
import FavoriteFullIcon from '../../assets/favorite_full.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

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
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFavButton, setShowFavButton] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.public_id);

      if (json.error === '') {
        setUserInfo(json.data);
        setFavorited(json.data.favorited);

        if (Object.keys(json.data).length > 0) {
          setShowTestimonials(true);
        }
      } else {
        alert(JSON.stringify(json.error));
      }

      setLoading(false);
      setShowFavButton(true);
    };
    getBarberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavClick = async () => {
    setFavorited(!favorited);

    let json = await Api.toggleFavorite(userInfo.public_id);

    if (json.error === '') {
      setFavorited(json.data.have);
    } else {
      setFavorited(!favorited);
    }
  };

  const handleServiceChoose = (item, key) => {
    setSelectedService(key);
    setServiceId(item.public_id);
    setShowModal(true);
  };

  return (
    <Container>
      <Scroller>
        {userInfo.photos ? (
          <Swiper
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: 300}}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            // eslint-disable-next-line react-native/no-inline-styles
            paginationStyle={{
              top: StatusBar.currentHeight + 15,
              right: 15,
              bottom: null,
              left: null,
            }}
            autoplay>
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

            {showFavButton && (
              <UserFavButton onPress={handleFavClick}>
                {favorited ? (
                  <FavoriteFullIcon width="24" height="24" fill="#F00" />
                ) : (
                  <FavoriteIcon width="24" height="24" fill="#F00" />
                )}
              </UserFavButton>
            )}
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#000" />}

          <ServiceArea>
            {userInfo.services && (
              <ServicesTitle>Lista de serviços</ServicesTitle>
            )}
            {userInfo.services &&
              userInfo.services.map((item, key) => (
                <ServiceItem key={key}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>
                      R$ {parseFloat(item.price).toFixed(2)}
                    </ServicePrice>
                  </ServiceInfo>

                  <ServiceChooseButton
                    onPress={() => handleServiceChoose(item, key)}>
                    <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
          </ServiceArea>

          {showTestimonials && (
            <TestimonialArea>
              <Swiper
                // eslint-disable-next-line react-native/no-inline-styles
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={<NavPrevIcon with="35" height="35" fill="#000" />}
                nextButton={<NavNextIcon with="35" height="35" fill="#000" />}
                autoplay
                autoplayTimeout={6}>
                {userInfo.testimonials.map((item, key) => (
                  <TestimonialItem key={key}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>

                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>

      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#fff" />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
        serviceId={serviceId}
      />
    </Container>
  );
};
