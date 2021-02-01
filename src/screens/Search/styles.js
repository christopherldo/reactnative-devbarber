import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const SearchArea = styled.View`
  height: 40px;
  background-color: #4eadbe;
  border-radius: 20px;
  padding: 0 20px;
  margin: 20px;
  margin-bottom: 10px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #fff;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 30px;
  margin-bottom: 30px;
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
