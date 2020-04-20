import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Title,
  ProgressBar,
  Dots,
  Line,
  DotContent,
  TitleProgress,
  Footer,
  Content,
  TitleFooter,
  Description,
} from './styles';

export default function Deliveries({ delivery, navigation }) {
  const data = new Date(
    delivery.end_date || delivery.start_date || delivery.createdAt
  ).getTime();

  return (
    <Container>
      <Header>
        <Icon name="local-shipping" color="#7d40e7" size={20} />
        <Title>Encomenda #{delivery.id}</Title>
      </Header>
      <ProgressBar>
        <Line />
        <DotContent>
          <Dots outline />
          <TitleProgress>Aguardando</TitleProgress>
        </DotContent>
        <DotContent>
          <Dots outline={delivery.start_date} />
          <TitleProgress>Retirada</TitleProgress>
        </DotContent>
        <DotContent>
          <Dots outline={delivery.end_date} />
          <TitleProgress>Entregue</TitleProgress>
        </DotContent>
      </ProgressBar>
      <Footer>
        <Content>
          <TitleFooter>Data</TitleFooter>
          <Description>
            {data ? format(data, 'dd/MM/yyyy') : 'Sem Data'}
          </Description>
        </Content>
        <Content>
          <TitleFooter>Cidade</TitleFooter>
          <Description>{delivery.recipient.city}</Description>
        </Content>
        <TouchableOpacity
          onPress={() => navigation.navigate('DeliveryDetail', { delivery })}
        >
          <Title>Ver detalhes</Title>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
}

Deliveries.propTypes = {
  delivery: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  navigation: PropTypes.shape({
    navigate: PropTypes.shape,
  }).isRequired,
};

Deliveries.defaultProps = {
  delivery: { start_date: null, end_date: null, create_date: null },
};
