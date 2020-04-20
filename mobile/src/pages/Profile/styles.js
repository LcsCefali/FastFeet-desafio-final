import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 70px 30px;
`;

export const Center = styled.View`
  justify-content: center;
  align-self: center;
  padding-bottom: 30px;
`;

export const Avatar = styled.Image`
  height: 170px;
  width: 170px;
  border-radius: 85px;
`;

export const Label = styled.Text`
  color: #999;
  font-weight: 600;
`;

export const Values = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 30px;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
`;
