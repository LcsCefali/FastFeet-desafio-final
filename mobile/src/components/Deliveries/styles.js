import styled from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  margin: 15px 20px;
  border: 2px solid rgba(0, 0, 0, 0.04);
  border-radius: 4px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

export const Title = styled.Text`
  padding-left: 10px;
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
`;

export const ProgressBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;
export const DotContent = styled.View`
  align-items: center;
`;

export const TitleProgress = styled.Text`
  color: #666;
  font-size: 12px;
  padding: 20px 0 0 0;
`;

export const Dots = styled.View`
  position: absolute;
  top: 0;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  border: 2px solid #7d40e7;
  background: ${(props) => (props.outline ? '#7d40e7' : '#fff')};
`;

export const Line = styled.View`
  position: absolute;
  top: 25px;
  width: 80%;
  margin-left: 18%;
  height: 2px;
  background: #7d40e7;
`;

export const Footer = styled.View`
  background: #eee;
  padding: 20px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Content = styled.View`
  flex-direction: column;
`;

export const TitleFooter = styled.Text`
  color: #999999;
  font-weight: bold;
  font-size: 12px;
`;

export const Description = styled.Text`
  color: #444;
  font-weight: bold;
`;
