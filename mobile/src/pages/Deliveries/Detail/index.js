import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Confirm from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Header,
  Info,
  HeaderInfo,
  Title,
  HeaderContent,
  Text,
  Situation,
  Date,
  Content,
  TextDate,
  Buttons,
  DeliveryButton,
  ButtonText,
} from './styles';

export default function Detail({ route, navigation }) {
  const { delivery } = route.params;
  const startDate = delivery.start_date ? new Date(delivery.start_date) : false;
  const endDate = delivery.end_date ? new Date(delivery.end_date) : false;
  // console.tron.log(startDate);

  return (
    <Container>
      <Header />
      <Info>
        <HeaderInfo>
          <Icon name="local-shipping" size={20} color="#7d40e7" />
          <Title>Informações da entrega</Title>
        </HeaderInfo>
        <HeaderContent>DESTINATÁRIO</HeaderContent>
        <Text>{delivery.recipient.name_destiny}</Text>
        <HeaderContent>ENDEREÇO DE ENTREGA</HeaderContent>
        <Text>
          {delivery.recipient.street}, {delivery.recipient.number},{' '}
          {delivery.recipient.city} - {delivery.recipient.state},{' '}
          {delivery.recipient.zip_code}
        </Text>
        <HeaderContent>PRODUTO</HeaderContent>
        <Text>{delivery.product}</Text>
      </Info>
      <Situation>
        <HeaderInfo>
          <Icon name="local-shipping" size={20} color="#7d40e7" />
          <Title>Informações da entrega</Title>
        </HeaderInfo>
        <HeaderContent>STATUS</HeaderContent>
        <Text>Pendente</Text>
        <Date>
          <Content>
            <HeaderContent>DATA DE RETIRADA</HeaderContent>
            <TextDate>
              {startDate ? format(startDate, 'dd/MM/yyyy') : '--/--/--'}
            </TextDate>
          </Content>
          <Content>
            <HeaderContent>DATA DE ENTREGA</HeaderContent>
            <TextDate>
              {endDate ? format(endDate, 'dd/MM/yyyy') : '--/--/--'}
            </TextDate>
          </Content>
        </Date>
      </Situation>
      <Buttons>
        <DeliveryButton
          onPress={() => navigation.navigate('ReportProblem', { delivery })}
        >
          <Icon name="highlight-off" size={20} color="#E74040" />
          <ButtonText>Informar Problema</ButtonText>
        </DeliveryButton>
        <DeliveryButton
          onPress={() => navigation.navigate('ShowProblem', { delivery })}
        >
          <Icon name="info-outline" size={20} color="#E7BA40" />
          <ButtonText>Visualizar Problemas</ButtonText>
        </DeliveryButton>
        <DeliveryButton onPress={() => navigation.navigate('ConfirmDelivery')}>
          <Confirm name="check-circle-outline" size={20} color="#7D40E7" />
          <ButtonText>Confirmar Entrega</ButtonText>
        </DeliveryButton>
      </Buttons>
    </Container>
  );
}

Detail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.shape,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape,
  }).isRequired,
};
