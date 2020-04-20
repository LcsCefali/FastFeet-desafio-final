import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure, logoutRequest } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    if (!user.admin) {
      toast.error('Usuário não é administrador');
      return;
    }

    yield put(signInSuccess(token, user));
    toast.success(`Seja bem vindo ${user.name}!`);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    history.push('/deliveries');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function logout() {
  toast.success(`Obrigado por utilizar FastFeet Web!`);
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/LOGOUT_REQUEST', logout),
]);
