import styled from 'styled-components/native';

export const Container = styled.SafeAreaView``;

export const TitleContent = styled.View`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 22px;
`;

export const Pending = styled.Text`
  font-weight: bold;
  padding: 0 5px;
  color: ${(params) => (params.active ? '#7d40e7' : '#999')};
  text-decoration: ${(params) => (params.active ? 'underline' : 'none')};
`;

export const Delivered = styled.Text`
  font-weight: bold;
  padding: 0 5px;
  color: ${(params) => (params.active ? '#999' : '#7d40e7')};
  text-decoration: ${(params) => (params.active ? 'none' : 'underline')};
`;

export const Right = styled.View`
  flex-direction: row;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  margin-bottom: 130px;
`;
