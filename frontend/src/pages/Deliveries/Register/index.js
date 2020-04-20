import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import history from '~/services/history';
import api from '~/services/api';
import { registerRequest } from '~/store/modules/deliveries/actions';
import AsyncSelect from '~/components/AsyncSelect';

import {
  Container,
  Header,
  Title,
  Content,
  ButtonBack,
  ButtonSave,
} from './styles';

const schema = Yup.object().shape({
  // recipient_id: Yup.string().required('O destinatário é obrigatório'),
  // deliveryman_id: Yup.string().required('O entregador é obrigatório'),
  product: Yup.string().required('Digite o produto desejado'),
});

export default function DeliveriesRegister() {
  const [recipient, setRecipient] = useState(false);
  const [deliveryman, setDeliveryman] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deliveries.loading);

  function handleSubmit({ product }) {
    dispatch(registerRequest(recipient, deliveryman, product));
  }

  async function loadRecipient() {
    const { data } = await api.get('recipient');

    return data.map((item) => {
      return {
        value: item.id,
        label: item.name_destiny,
      };
    });
  }

  async function loadDeliveryman() {
    const { data } = await api.get('deliveryman');

    return data.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Header>
          <Title>Cadastro de encomendas</Title>
          <div>
            <ButtonBack onClick={() => history.goBack()}>
              <MdKeyboardArrowLeft color="#fff" size={30} />
              <div>VOLTAR</div>
            </ButtonBack>
            <ButtonSave type="submit">
              <MdCheck color="#fff" size={30} />
              <div>{loading ? 'Carregando...' : 'SALVAR'}</div>
            </ButtonSave>
          </div>
        </Header>
        <Content>
          <div>
            <section>
              <label>Destinatário</label>
              <AsyncSelect
                type="text"
                label="Destinatário"
                name="recipient_id"
                defaultOptions
                placeholder="Selecione um destinatário"
                loadOptions={() => loadRecipient()}
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
                loadingMessage={() => 'Carregando...'}
                onChange={(option) => setRecipient(option.value)}
              />
            </section>
            <section>
              <label>Entregador</label>
              <AsyncSelect
                type="text"
                name="deliveryman_id"
                defaultOptions
                placeholder="Selecione um entregador(a)"
                loadOptions={() => loadDeliveryman()}
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
                loadingMessage={() => 'Carregando...'}
                onChange={(option) => setDeliveryman(option.value)}
              />
            </section>
          </div>
          <section>
            <label>Produto</label>
            <Input
              name="product"
              type="text"
              placeholder="Descreva o produto"
            />
          </section>
        </Content>
      </Form>
    </Container>
  );
}
