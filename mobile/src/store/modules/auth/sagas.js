import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { deliveryman_id } = payload;

    const response = yield call(api.get, `deliveryman/${deliveryman_id}`);

    const { token, deliveryman } = response.data;

    if (!token || !deliveryman) {
      Alert.alert('Falha na autenticação', 'Informe um ID válido.');
      yield put(signFailure());
      return false;
    }

    yield put(signInSuccess(token, deliveryman));
    Alert.alert('Bem Vindo!', `Faça bom uso ${deliveryman.name}!`);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    // history.push('/deliveries');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Informe um ID válido.');
    yield put(signFailure());
  }
}

export function logout() {
  Alert.alert('Volte sempre', `Obrigado por utilizar FastFeet Mobile!`);
  // history.push('/');
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
