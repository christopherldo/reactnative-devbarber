import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import Api from '../../Api';

import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  ListArea,
  NoBarberAlert,
} from './styles';

import AppointmentItem from '../../components/AppointmentItem';

export default () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [showList, setShowList] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAppointments();
  }, [isFocused]);

  const getAppointments = async () => {
    setLoading(true);
    setList([]);

    setShowList(true);

    let now = new Date();
    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDay = now.getDate();
    let nowHour = now.getHours();
    let nowMinutes = now.getMinutes();
    let nowSeconds = now.getSeconds();

    nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
    nowDay = nowDay < 10 ? '0' + nowDay : nowDay;
    nowHour = nowHour < 10 ? '0' + nowHour : nowHour;
    nowMinutes = nowMinutes < 10 ? '0' + nowMinutes : nowMinutes;
    nowSeconds = nowSeconds < 10 ? '0' + nowSeconds : nowSeconds;

    let formattedNow = `${nowYear}-${nowMonth}-${nowDay} ${nowHour}:${nowMinutes}:${nowSeconds}`;

    let res = await Api.getAppointments(formattedNow);

    if (res.error === '') {
      let resList = res.list;

      let newList = [];

      resList.map((item, key) => {
        let dDate = item.datetime.split(' ')[0].split('-');
        let dTime = item.datetime.split(' ')[1].split(':');

        let date = new Date(
          Date.UTC(dDate[0], dDate[1], dDate[2], dTime[0], dTime[1]),
        );

        if (date >= now) {
          newList.push(item);
        }
      });

      setList(newList);

      if (Object.keys(res.list).length === 0) {
        setShowList(false);
      }
    } else {
      alert(JSON.stringify(res.error));
    }

    setLoading(false);
  };

  const onRefresh = () => {
    getAppointments();
  };

  return (
    <Container>
      <HeaderArea>
        <HeaderTitle>Agendamentos</HeaderTitle>
      </HeaderArea>

      <Scroller
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <ListArea>
          {showList ? (
            list.map((item, k) => <AppointmentItem key={k} data={item} />)
          ) : (
            <NoBarberAlert>Você não possui nenhum agendamento.</NoBarberAlert>
          )}
        </ListArea>
      </Scroller>
    </Container>
  );
};
