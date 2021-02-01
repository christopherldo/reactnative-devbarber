import React from 'react';
import styled from 'styled-components/native';

const Area = styled.View`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
`;

const UserArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  margin-right: 20px;
`;

const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const SplitArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const ServiceText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const DateText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #4eadbe;
`;

export default ({data}) => {
  let dDate = data.datetime.split(' ')[0].split('-');
  let dTime = data.datetime.split(' ')[1].split(':');

  let date = new Date(
    Date.UTC(dDate[0], dDate[1], dDate[2], dTime[0], dTime[1]),
  );

  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let hour = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let dateString = `${day}/${month}/${year}`;
  let time = `${hour}:${minutes}`;

  return (
    <Area>
      <UserArea>
        <Avatar source={{uri: data.barber.avatar}} />
        <UserName>{data.barber.name}</UserName>
      </UserArea>

      <SplitArea>
        <ServiceText>{data.service.name}</ServiceText>
        <ServiceText>
          R$ {parseFloat(data.service.price).toFixed(2)}
        </ServiceText>
      </SplitArea>

      <SplitArea>
        <DateText>{dateString}</DateText>
        <DateText>{time}</DateText>
      </SplitArea>
    </Area>
  );
};
