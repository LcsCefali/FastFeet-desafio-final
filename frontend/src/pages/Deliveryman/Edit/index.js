import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import history from '~/services/history';
import { updateRequest } from '~/store/modules/deliveryman/actions';
import AvatarInput from '~/components/AvatarInput';

import {
  Container,
  Header,
  Title,
  Content,
  ButtonBack,
  ButtonSave,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().email().required('O email é obrigatório'),
  avatar_id: Yup.string(),
});

export default function DeliverymanEdit() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.deliveryman.loading);
  const params = useLocation();

  async function handleSubmit({ avatar_id, name, email }) {
    const { id } = params.state;
    dispatch(updateRequest(id, avatar_id, name, email));
  }

  return (
    <Container>
      <Form schema={schema} initialData={params.state} onSubmit={handleSubmit}>
        <Header>
          <Title>Edição de entregadores</Title>
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
            {params.state.avatar ? (
              <AvatarInput
                name="avatar_id"
                defaultValue={params.state.avatar}
              />
            ) : (
                <AvatarInput name="avatar_id" />
              )}
          </li>
          <div>
            <label>Nome</label>
            <Input name="name" type="text" />
          </div>
          <div>
            <label>Email</label>
            <Input name="email" type="text" />
          </div>
        </Content>
      </Form>
    </Container>
  );
}
