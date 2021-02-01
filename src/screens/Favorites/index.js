import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import Api from '../../Api';

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  LoadingIcon,
  ListArea,
  NoBarberAlert,
} from './styles';

import BarberItem from '../../components/BarberItem';

export default () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    getFavorites();
  }, [isFocused]);

  const getFavorites = async (resetList = false) => {
    if (resetList) {
      setList([]);
    }

    setShowList(true);

    let res = await Api.getFavorites();

    if (res.error === '') {
      setList(res.list);

      if (Object.keys(res.list).length === 0) {
        setShowList(false);
      }
    } else {
      alert(JSON.stringify(res.error));
    }

    setLoading(false);
  };

  const onRefresh = () => {
    setLoading(true);
    getFavorites(true);
  };

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Favoritos</HeaderTitle>
      </HeaderArea>

      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <ListArea>
          {showList ? (
            list.map((item, k) => <BarberItem key={k} data={item} />)
          ) : (
            <NoBarberAlert>Você não possui nenhum favorito.</NoBarberAlert>
          )}
        </ListArea>
      </Scroller>
    </Container>
  );
};
