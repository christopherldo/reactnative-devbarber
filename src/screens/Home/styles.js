import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  width: 180px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  line-height: 36px;
`;

export const SearchButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
`;

export const LocationArea = styled.View`
  background-color: #4eadbe;
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`;

export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #fff;
`;

export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export const ListArea = styled.View`
  margin-top: 10px;
  margin-bottom: 50px;
`;

export const NoBarberAlert = styled.Text`
  align-self: center;
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
  color: #fff;
`;
