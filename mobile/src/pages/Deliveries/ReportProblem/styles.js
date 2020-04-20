import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;

export const Header = styled.View`
  /* flex: 1; */
  position: relative;
  height: 150px;
  background-color: #7d40e7;
  z-index: -1;
`;

export const ContainerInput = styled.View`
  align-self: stretch;
  margin: -60px 15px 2px 15px;
  padding: 0 5px;
  background-color: #fff;
  /* margin: 15px 20px; */
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  height: 400px;
`;
export const ContainerButton = styled.View`
  padding: 15px 18px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  /* flex: 1; */
  font-size: 15px;
  margin-left: 7px;
  padding: 30px 20px 50px 20px;
  /* height: 250px; */
  color: #999;
`;

export const SubmitButton = styled(Button)`
  background: #7d40e7;
`;
