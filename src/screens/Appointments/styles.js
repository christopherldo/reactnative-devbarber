import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const HeaderArea = styled.View`
  height: 80px;
  justify-content: center;
  padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  text-align: left;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const ListArea = styled.View`
  /* margin-top: 20px; */
  margin-bottom: 30px;
`;

export const NoBarberAlert = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  color: #fff;
`;
