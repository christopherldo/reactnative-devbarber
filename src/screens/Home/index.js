import React, {useState, useEffect} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import Api from '../../Api';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  LoadingIcon,
  ListArea,
  NoBarberAlert,
} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(true);

  const handleLocationFinder = async () => {
    setLocationText('');

    let permission;
    let result;

    switch (Platform.OS) {
      case 'ios':
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
        break;
      case 'android':
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        break;
    }

    if (permission) {
      result = await request(permission);
    }

    if (result === 'granted') {
      Geolocation.getCurrentPosition((info) => {
        getBarbers(info.coords.latitude, info.coords.longitude);
      });
    } else {
      getBarbers();
    }
  };

  const getBarbers = async (latitude, longitude, location = false) => {
    setLoading(true);
    setShowList(true);
    setList([]);

    let [lat, lng, city, distance, offset] = '';

    if (latitude) {
      lat = latitude;
    }

    if (longitude) {
      lng = longitude;
    }

    if (location) {
      city = locationText;
    }

    let res = await Api.getBarbers(lat, lng, city, distance, offset);

    if (res.error === '') {
      setList(res.data);

      if (Object.keys(res.data).length === 0) {
        setShowList(false);
      }

      setLocationText(res.location);
    } else {
      alert(JSON.stringify(res.error));
    }

    setLoading(false);
  };

  useEffect(() => {
    handleLocationFinder();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onRefresh = () => {
    handleLocationFinder();
  };

  const handleLocationSearch = () => {
    getBarbers('', '', true);
  };
  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>

          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon widht="26" height="26" fill="#fff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#fff"
            value={locationText}
            onChangeText={(t) => setLocationText(t)}
            onSubmitEditing={handleLocationSearch}
          />

          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#fff" />
          </LocationFinder>
        </LocationArea>

        {loading && <LoadingIcon size="large" color="#fff" />}

        <ListArea>
          {showList ? (
            list.map((item, k) => <BarberItem key={k} data={item} />)
          ) : (
            <NoBarberAlert>
              Ainda não há barbeiros em sua região :/
            </NoBarberAlert>
          )}
        </ListArea>
      </Scroller>
    </Container>
  );
};
