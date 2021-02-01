import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

import Api from '../Api';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 20px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
  height: 60px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtonText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #fff;
`;

const DateInfo = styled.View`
  flex-direction: row;
`;

const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;

const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;

const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
`;

const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DateList = styled.ScrollView``;

const DateItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const TimeList = styled.ScrollView``;

const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const TimeItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default ({show, setShow, user, service, serviceId}) => {
  const navigation = useNavigation();

  const [blackStatus, setBlackStatus] = useState(true);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(-1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);
  const [finishButtonActive, setFinishButtonActive] = useState(false);

  useEffect(() => {
    setBlackStatus(!blackStatus);

    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (user.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      let todayDate = new Date();
      let todayYear = todayDate.getFullYear();
      let todayMonth = todayDate.getMonth() + 1;
      let todayDay = todayDate.getDate();

      todayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;
      todayDay = todayDay < 10 ? '0' + todayDay : todayDay;

      let todayStringDate = `${todayYear}-${todayMonth}-${todayDay}`;

      setSelectedDay(0);

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter((e) => e.date === selDate);

        if (todayStringDate === selDate && availability.length > 0) {
          setSelectedDay(Number(todayDay));
        }

        if (todayMonth === month && todayDay <= day) {
          newListDays.push({
            status: availability.length > 0 ? true : false,
            weekday: days[d.getDay()],
            number: i,
          });
        } else if (todayMonth !== month) {
          newListDays.push({
            status: availability.length > 0 ? true : false,
            weekday: days[d.getDay()],
            number: i,
          });
        }
      }

      setListDays(newListDays);
      setListHours([]);
      setSelectedHour(0);
    }
  }, [selectedMonth, selectedYear, user]);

  useEffect(() => {
    if (selectedDay > 0) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);

      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      let selDate = `${year}-${month}-${day}`;

      let dToday = new Date();
      let nowYear = dToday.getFullYear();
      let nowMonth = dToday.getMonth() + 1;
      let nowDay = dToday.getDate();

      nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth;
      nowDay = nowDay < 10 ? '0' + nowDay : nowDay;

      let nowDate = `${nowYear}-${nowMonth}-${nowDay}`;

      let nowHour = dToday.getHours();
      let nowMinutes = dToday.getMinutes();

      let availability = user.available.filter((e) => e.date === selDate);

      if (availability.length > 0) {
        let hours = [];

        if (selDate === nowDate) {
          let hoursList = availability[0].hours;
          let maxTime = hoursList[hoursList.length - 1].split(':');

          let maxHour = Number(maxTime[0]);
          let maxMinutes = Number(maxTime[1]);

          if (
            nowHour < maxHour ||
            (nowHour === maxHour && nowMinutes < maxMinutes)
          ) {
            hoursList.map((item) => {
              let array = item.split(':');

              if (nowHour < Number(array[0])) {
                hours.push(item);
              } else if (
                nowHour === Number(array[0]) &&
                nowMinutes < Number(array[1])
              ) {
                hours.push(item);
              }
            });
          }

          if (hours.length === 0) {
            let newListDays = listDays;

            newListDays.map((item, key) => {
              if (item.number === Number(nowDay)) {
                newListDays[key].status = false;
              }
              setSelectedDay(0);
            });

            setListDays(newListDays);
          }
        } else {
          hours = availability[0].hours;
        }

        setListHours(hours);
      }
    }
    setSelectedHour(null);
  }, [selectedDay, selectedMonth, selectedYear, user, listDays]);

  const handleCloseButton = () => {
    setShow(false);
    setSelectedYear(0);
    setSelectedMonth(-1);
    setSelectedDay(0);
    setSelectedHour(null);
  };

  const handleFinishClick = async () => {
    if (
      user.public_id &&
      serviceId !== null &&
      selectedYear > 0 &&
      selectedMonth >= 0 &&
      selectedDay > 0 &&
      selectedHour !== null
    ) {
      let hour = selectedHour.split(':');
      let formattedHour = Number(hour[0]);
      let formattedMinutes = Number(hour[1]);

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

      let res = await Api.setAppointment(
        user.public_id,
        serviceId,
        selectedYear,
        selectedMonth,
        selectedDay,
        formattedHour,
        formattedMinutes,
        formattedNow,
      );

      if (res.error === '') {
        setShow(false);
        navigation.navigate('Appointments');
      } else {
        alert(JSON.stringify(res.error));
      }
    }
  };

  const handleLeftDateClick = () => {
    let today = new Date();

    let mountDate = new Date(selectedYear, selectedMonth);

    if (today < mountDate) {
      mountDate.setMonth(mountDate.getMonth() - 1);
      setSelectedYear(mountDate.getFullYear());
      setSelectedMonth(mountDate.getMonth());
      setSelectedDay(0);
      setFinishButtonActive(false);
    }
  };

  const handleRightDateClick = () => {
    let maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);

    let mountDate = new Date(selectedYear, selectedMonth);

    if (mountDate < maxDate) {
      mountDate.setMonth(mountDate.getMonth() + 1);
      setSelectedYear(mountDate.getFullYear());
      setSelectedMonth(mountDate.getMonth());
      setSelectedDay(0);
      setFinishButtonActive(false);
    }
  };

  const handleDateItem = (item) => {
    if (item.status) {
      if (selectedDay !== item.number) {
        setSelectedDay(item.number);
        setFinishButtonActive(false);
      }
    }
  };

  const handleTimeItem = (item) => {
    setSelectedHour(item);
    setFinishButtonActive(true);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={blackStatus ? 'rgba(0,0,0,0.5)' : 'transparent'}
        barStyle="light-content"
      />
      <Modal
        transparent={true}
        visible={show}
        animationType="slide"
        onRequestClose={() => setShow(false)}>
        <ModalArea>
          <ModalBody>
            <CloseButton onPress={handleCloseButton}>
              <ExpandIcon width="40" height="40" fill="#000" />
            </CloseButton>

            <ModalItem>
              <UserInfo>
                <UserAvatar source={{uri: user.avatar}} />
                <UserName>{user.name}</UserName>
              </UserInfo>
            </ModalItem>

            {service !== null && (
              <ModalItem>
                <ServiceInfo>
                  <ServiceName>{user.services[service].name}</ServiceName>
                  <ServicePrice>
                    R$ {parseFloat(user.services[service].price).toFixed(2)}
                  </ServicePrice>
                </ServiceInfo>
              </ModalItem>
            )}

            <ModalItem>
              <DateInfo>
                <DatePrevArea onPress={handleLeftDateClick}>
                  <NavPrevIcon width="35" height="35" fill="#000" />
                </DatePrevArea>

                <DateTitleArea>
                  <DateTitle>
                    {months[selectedMonth]} {selectedYear}
                  </DateTitle>
                </DateTitleArea>

                <DateNextArea onPress={handleRightDateClick}>
                  <NavNextIcon width="35" height="35" fill="#000" />
                </DateNextArea>
              </DateInfo>

              <DateList
                horizontal
                showsHorizontalScrollIndicator={false}
                // eslint-disable-next-line react-native/no-inline-styles
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                }}>
                {listDays.map((item, key) => (
                  <DateItem
                    key={key}
                    onPress={() => handleDateItem(item)}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      backgroundColor:
                        item.number === selectedDay ? '#4eadbe' : '#fff',
                    }}>
                    <DateItemWeekDay
                      style={
                        item.number === selectedDay && listHours.length > 0
                          ? // eslint-disable-next-line react-native/no-inline-styles
                            {color: '#fff'}
                          : item.status
                          ? // eslint-disable-next-line react-native/no-inline-styles
                            {color: '#000'}
                          : // eslint-disable-next-line react-native/no-inline-styles
                            {color: 'rgba(0, 0, 0, 0.2)'}
                      }>
                      {item.weekday}
                    </DateItemWeekDay>
                    <DateItemNumber
                      style={
                        item.number === selectedDay
                          ? // eslint-disable-next-line react-native/no-inline-styles
                            {color: '#fff'}
                          : item.status
                          ? // eslint-disable-next-line react-native/no-inline-styles
                            {color: '#000'}
                          : // eslint-disable-next-line react-native/no-inline-styles
                            {color: 'rgba(0, 0, 0, 0.2)'}
                      }>
                      {item.number}
                    </DateItemNumber>
                  </DateItem>
                ))}
              </DateList>
            </ModalItem>

            {listHours.length > 0 && (
              <ModalItem>
                <TimeList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  // eslint-disable-next-line react-native/no-inline-styles
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}>
                  {listHours.map((item, key) => (
                    <TimeItem
                      key={key}
                      onPress={() => handleTimeItem(item)}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        backgroundColor:
                          item === selectedHour ? '#4eadbe' : '#fff',
                      }}>
                      <TimeItemText
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          color: item === selectedHour ? '#fff' : '#000',
                        }}>
                        {item}
                      </TimeItemText>
                    </TimeItem>
                  ))}
                </TimeList>
              </ModalItem>
            )}

            <FinishButton
              onPress={handleFinishClick}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: finishButtonActive
                  ? 'rgba(38, 133, 150, 1)'
                  : 'rgba(38, 133, 150, 0.1)',
              }}>
              <FinishButtonText>Finalizar Agendamento</FinishButtonText>
            </FinishButton>
          </ModalBody>
        </ModalArea>
      </Modal>
    </>
  );
};
