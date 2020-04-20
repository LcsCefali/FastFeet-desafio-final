import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView`
  flex: 1;
  /* background-color: #7d40e7; */
`;

export const Header = styled.View`
  /* flex: 1; */
  position: relative;
  height: 150px;
  background-color: #7d40e7;
  z-index: -1;
`;

export const Info = styled.View`
  align-self: stretch;
  margin: -80px 15px 2px 15px;
  padding: 0 5px;
  background-color: #fff;
  /* margin: 15px 20px; */
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 6px;
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.Text`
  padding-left: 10px;
  color: #7d40e7;
  font-weight: bold;
  font-size: 15px;
`;

export const HeaderContent = styled.Text`
  font-weight: bold;
  font-size: 16;
  color: #777;
  padding: 5px 10px;
`;

export const Text = styled.Text`
  color: #999;
  padding: 2px 10px 20px 10px;
`;

export const Situation = styled.View`
  align-self: stretch;
  margin: 5px 15px 5px 15px;
  padding: 0 5px;
  background-color: #fff;
  /* margin: 15px 20px; */
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 6px;
`;

export const Date = styled.View`
  flex-direction: row;
`;

export const Content = styled.View`
  flex-direction: column;
`;

export const TextDate = styled.Text`
  color: #999;
  padding: 2px 10px 20px 10px;
  font-weight: bold;
  font-size: 16;
`;

export const Buttons = styled.View`
  flex-direction: row;
  align-self: stretch;
  margin: 5px 15px 5px 15px;
  padding: 0 5px;
  background-color: #fff;
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 6px;
`;

export const DeliveryButton = styled.TouchableOpacity`
  flex: 1;
  flex-shrink: 1;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin-right: 1px;
`;

export const ButtonText = styled.Text`
  color: #999;
  text-align: center;
`;
