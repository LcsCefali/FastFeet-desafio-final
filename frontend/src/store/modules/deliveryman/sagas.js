import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  registerSuccess,
  registerFailure,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteFailure,
} from './actions';

export function* registerRequest({ payload }) {
  try {
    const response = yield call(api.post, 'deliveryman', payload);

    yield put(registerSuccess());
    toast.success(`Entregador ${response.data.name} cadastrado com sucesso!`);
    history.goBack();
  } catch (err) {
    toast.error('Falha no cadastro, verifique os dados');
    yield put(registerFailure());
  }
}

export function* updateRequest({ payload }) {
  try {
    const { id, avatar_id, name, email } = payload;

    yield call(api.put, `deliveryman/${id}`, {
      avatar_id,
      name,
      email,
    });

    yield put(updateSuccess());
    toast.success(`Entregador(a) ${name} editado(a) com sucesso!`);
    history.goBack();
  } catch (err) {
    toast.error('Falha na edição, verifique os dados!');
    yield put(updateFailure());
  }
}

export function* deleteRequest({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.delete, `deliveryman/${id}`);

    yield put(deleteSuccess());
    toast.success(
      `Entregador(a) (${response.data.name}) excluido(a) com sucesso!`
    );
  } catch (err) {
    toast.error('Falha na exclusão, verifique os dados!');
    yield put(deleteFailure());
  }
}

export default all([
  takeLatest('@deliveryman/REGISTER_REQUEST', registerRequest),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateRequest),
  takeLatest('@deliveryman/DELETE_REQUEST', deleteRequest),
]);
