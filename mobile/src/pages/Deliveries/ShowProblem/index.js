import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useIsFocused } from '@react-navigation/native';
import api from '~/services/api';

import {
  Container,
  Header,
  Delivery,
  Content,
  List,
  Problem,
  Description,
  DateDescription,
  ProblemContainer,
} from './styles';

export default function ShowProblem({ route }) {
  const [problem, setProblem] = useState([]);
  const isFocused = useIsFocused();
  const { delivery } = route.params;

  async function loadProblems() {
    const response = await api.get(`/delivery/${delivery.id}/problems`);
    setProblem(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadProblems();
    }
  }, [isFocused]);
  // ;

  return (
    <Container>
      <Header />
      <Content>
        <Delivery>Encomenda #{delivery.id}</Delivery>

        <List
          data={problem}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Problem key={item.id}>
              <ProblemContainer>
                <Description>{item.description}</Description>
                <DateDescription>
                  {format(new Date(delivery.createdAt), 'dd/MM/yyyy')}
                </DateDescription>
              </ProblemContainer>
            </Problem>
          )}
        />
      </Content>
    </Container>
  );
}
