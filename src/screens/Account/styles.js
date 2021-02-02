import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #63c2d1;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const ProfileArea = styled.View`
  flex: 1;
  margin: 20px;
  border-radius: 20px;
  justify-content: center;
`;

export const Scroller = styled.ScrollView`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  max-height: 200px;
`;

export const UserHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 20px;
`;

export const Name = styled.Text`
  flex: 1;
  padding: 0 20px;
  font-size: 18px;
  color: #000;
`;

export const UserContact = styled.View`
  margin-top: 20px;
  padding: 0 10px;
`;

export const Contact = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const ContactText = styled.Text`
  flex: 1;
  padding: 0 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
`;

export const OptionsArea = styled.View`
  height: 350px;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
`;

export const Top = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  margin: 0 10px;
  border-top-width: 0px;
`;

export const Option = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  margin: 0 10px;
  border-top-width: 1px;
  border-color: #63c2d1;
`;

export const OptionText = styled.Text`
  flex: 1;
  margin-left: 10px;
  font-size: 16px;
`;
