import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  register: false,
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveries/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@deliveries/REGISTER_SUCCESS': {
        draft.register = true;
        draft.loading = false;
        break;
      }
      case '@deliveries/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
