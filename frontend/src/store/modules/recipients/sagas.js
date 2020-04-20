import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  registerSuccess,
  registerFailure,
  updateSuccess,
  updateFailure,
} from './actions';

export function* registerRequest({ payload }) {
  try {
    const {
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    } = payload;

    yield call(api.post, 'recipient', {
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    });

    // const { name_destiny } = response;

    yield put(registerSuccess());
    toast.success(`Destinatário (${name_destiny}) cadastrado com sucesso!`);
    history.goBack();
  } catch (err) {
    toast.error('Falha no cadastro, verifique os dados');
    yield put(registerFailure());
  }
}

export function* updateRequest({ payload }) {
  try {
    const {
      recipient_id,
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    } = payload;

    const response = yield call(api.put, `recipient/${recipient_id}`, {
      name_destiny,
      street,
      number,
      city,
      state,
      complement,
      zip_code,
    });
    console.tron.log(response.data);
    // const { name_destiny } = response;

    yield put(updateSuccess());
    toast.success(
      `Destinatário (${response.data.name_destiny}) editado com sucesso!`
    );
    history.goBack();
  } catch (err) {
    toast.error('Falha na edição, verifique os dados');
    yield put(updateFailure());
  }
}

export default all([
  takeLatest('@recipients/REGISTER_REQUEST', registerRequest),
  takeLatest('@recipients/UPDATE_REQUEST', updateRequest),
]);
