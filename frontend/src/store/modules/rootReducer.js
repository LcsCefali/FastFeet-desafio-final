import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import deliveries from './deliveries/reducer';
import recipients from './recipients/reducer';
import deliveryman from './deliveryman/reducer';
import problems from './problems/reducer';

export default combineReducers({
  auth,
  user,
  deliveries,
  recipients,
  deliveryman,
  problems,
});
