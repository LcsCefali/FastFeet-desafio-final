import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '~/services/history';
import { updateRequest } from '~/store/modules/recipients/actions';

import {
  Container,
  Header,
  Title,
  Content,
  ButtonBack,
  ButtonSave,
} from './styles';

const schema = Yup.object().shape({
  name_destiny: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.string().required('O número é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  complement: Yup.string(),
  zip_code: Yup.string()
    .min(8, 'Mínimo de 8 caracteres')
    .max(9, 'Máximo de 9 caracteres')
    .required('O CEP é obrigatório'),
});

export default function RecipientEdit() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.recipients.loading);
  const params = useLocation();

  const initialData = {
    recipient_id: params.state.id,
    name_destiny: params.state.name_destiny,
    street: params.state.street,
    number: params.state.number,
    city: params.state.city,
    state: params.state.state,
    complement: params.state.complement,
    zip_code: params.state.zip_code,
  };

  function handleSubmit({
    name_destiny,
    street,
    number,
    city,
    state,
    complement,
    zip_code,
  }) {
    const { recipient_id } = initialData;
    dispatch(
      updateRequest(
        recipient_id,
        name_destiny,
        street,
        number,
        city,
        state,
        complement,
        zip_code.replace('-', '')
      )
    );
  }

  return (
    <Container>
      <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
        <Header>
          <Title>Edição de destinatários</Title>
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
          <li>
            <label>Nome</label>
            <Input name="name_destiny" type="text" />
          </li>
          <li>
            <div>
              <div>
                <label>Rua</label>
                <Input name="street" type="text" />
              </div>
              <div>
                <label>Número</label>
                <Input name="number" type="number" />
              </div>
              <div>
                <label>Complemento</label>
                <Input name="complement" type="text" />
              </div>
            </div>
          </li>
          <li>
            <div>
              <div>
                <label>Cidade</label>
                <Input name="city" type="text" />
              </div>
              <div>
                <label>Estado</label>
                <Input name="state" type="text" />
              </div>
              <div>
                <label>CEP</label>
                <Input name="zip_code" type="text" />
              </div>
            </div>
          </li>
        </Content>
      </Form>
    </Container>
  );
}
