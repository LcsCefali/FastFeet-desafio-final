import styled from 'styled-components/native';

export const Container = styled.SafeAreaView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  align-self: stretch;
`;

export const Header = styled.View`
  position: relative;
  height: 150px;
  background-color: #7d40e7;
  z-index: -1;
`;

export const Delivery = styled.Text`
  margin: -50px 15px 2px 15px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export const Content = styled.View`
  align-self: stretch;
  margin: -40px 15px 2px 15px;
  padding: 0 5px;
  /* background-color: #fff; */
  /* margin: 15px 20px; */
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  margin-bottom: 50px;
`;

export const Problem = styled.View`
  padding: 5px 20px;
`;

export const Description = styled.Text`
  color: #999;
  width: 140px;
  font-size: 15px;
  font-weight: bold;
`;

export const DateDescription = styled.Text`
  color: #999;
`;

export const ProblemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.04);
  background-color: #fff;
`;
