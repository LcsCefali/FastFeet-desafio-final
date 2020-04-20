import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const Center = styled.View`
  padding-left: 15px;
`;

export const WelcomeText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const Deliveryman = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #444;
  max-width: 180px;
`;
