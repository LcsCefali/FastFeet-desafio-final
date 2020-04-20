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
    const { recipient_id, deliveryman_id, product } = payload;

    const response = yield call(api.post, 'deliveries', {
      recipient_id,
      deliveryman_id,
      product,
    });

    // const { product } = response.data;

    yield put(registerSuccess());
    toast.success('Encomenda cadastrada com sucesso!');
    history.goBack();
  } catch (err) {
    toast.error('Falha no cadastro, verifique os dados!');
    yield put(registerFailure());
  }
}

export function* updateRequest({ payload }) {
  try {
    const { delivery_id, recipient_id, deliveryman_id, product } = payload;

    const response = yield call(api.put, `deliveries/${delivery_id}`, {
      delivery_id,
      recipient_id,
      deliveryman_id,
      product,
    });

    // const { product } = response.data;

    yield put(updateSuccess());
    toast.success('Encomenda editada com sucesso!');
    history.goBack();
  } catch (err) {
    toast.error('Falha na edição, verifique os dados!');
    yield put(updateFailure());
  }
}

export function* deleteRequest({ payload }) {
  try {
    const { delivery_id } = payload;

    const response = yield call(api.delete, `deliveries/${delivery_id}`);

    // const { product } = response.data;

    yield put(deleteSuccess());
    toast.success(`Encomenda (${response.data.product}) excluida com sucesso!`);
  } catch (err) {
    toast.error('Falha na exclusão, verifique os dados!');
    yield put(deleteFailure());
  }
}

export default all([
  takeLatest('@deliveries/REGISTER_REQUEST', registerRequest),
  takeLatest('@deliveries/UPDATE_REQUEST', updateRequest),
  takeLatest('@deliveries/DELETE_REQUEST', deleteRequest),
]);
