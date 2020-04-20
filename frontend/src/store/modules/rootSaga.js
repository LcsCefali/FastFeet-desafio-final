import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
import deliveries from './deliveries/sagas';
import recipients from './recipients/sagas';
import deliveryman from './deliveryman/sagas';
import problems from './problems/sagas';

export default function* rootSaga() {
  return yield all([auth, user, deliveries, recipients, deliveryman, problems]);
}
