import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';

import { registerSuccess, registerFailure } from './actions';

export function* registerProblem({ payload }) {
  try {
    const { problem, delivery } = payload;

    const response = yield call(api.post, `/delivery/${delivery}/problems`, {
      delivery_id: delivery,
      description: problem,
    });

    const { createdAt } = response.data;

    if (!createdAt) {
      Alert.alert('Falha ao salvar!', 'Houve um erro inesperado');
      yield put(registerFailure());
      return false;
    }

    yield put(registerSuccess());
    Alert.alert('Salvo com sucesso!', `Problema foi registrado, obrigado!`);
  } catch (err) {
    Alert.alert('Falha ao salvar!', 'Houve um erro inesperado');
    yield put(registerFailure());
  }
}

export default all([
  takeLatest('@deliveries/REGISTER_REQUEST', registerProblem),
]);
