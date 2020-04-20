import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { registerRequest } from '~/store/modules/deliveries/actions';

import {
  Container,
  ContainerInput,
  Header,
  TInput,
  SubmitButton,
  ContainerButton,
} from './styles';

export default function ReportProblem({ route }) {
  const [problem, setProblem] = useState([]);
  const dispatch = useDispatch();
  const { id } = route.params.delivery;

  function handleSubmit() {
    dispatch(registerRequest(problem, id));
  }

  return (
    <Container>
      <Header />
      <ContainerInput>
        <TInput
          multiline
          placeholder="Inclua aqui o problema que ocorreu na entrega"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={problem}
          onChangeText={setProblem}
        />
      </ContainerInput>
      <ContainerButton>
        <SubmitButton onPress={handleSubmit} loading={false}>
          <Text>Enviar</Text>
        </SubmitButton>
      </ContainerButton>
    </Container>
  );
}
