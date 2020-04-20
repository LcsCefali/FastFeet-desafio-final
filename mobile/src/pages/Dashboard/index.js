import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import api from '~/services/api';
import {
  Container,
  TitleContent,
  Title,
  Pending,
  Delivered,
  Right,
  List,
} from './styles';
import Header from '~/components/Header';
import Deliveries from '~/components/Deliveries';

export default function Dashboard({ navigation }) {
  const [active, setActive] = useState(true);
  const [deliveries, setDeliveries] = useState([]);
  const deliveryman = useSelector((state) => state.user.profile.id);
  const isFocused = useIsFocused();

  function handlePressDeliveries(value) {
    setActive(value);
  }

  async function loadDeliveries() {
    const response = await api.get(`deliveries/${deliveryman}`);
    setDeliveries(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header />
      <TitleContent>
        <Title>Entregas</Title>
        <Right>
          <TouchableOpacity onPress={() => handlePressDeliveries(true)}>
            <Pending active={active}>Pendentes</Pending>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePressDeliveries(false)}>
            <Delivered active={active}>Entregas</Delivered>
          </TouchableOpacity>
        </Right>
      </TitleContent>

      <List
        data={deliveries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Deliveries delivery={item} navigation={navigation} />
        )}
      />
    </Container>
  );
}
