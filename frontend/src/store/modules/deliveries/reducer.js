import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
  created: false,
};

export default function deliveries(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@deliveries/REGISTER_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@deliveries/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@deliveries/REGISTER_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      case '@deliveries/UPDATE_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@deliveries/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@deliveries/UPDATE_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      case '@deliveries/DELETE_REQUEST': {
        draft.loading = true;
        draft.created = false;
        break;
      }
      case '@deliveries/DELETE_SUCCESS': {
        draft.loading = false;
        draft.created = true;
        break;
      }
      case '@deliveries/DELETE_FAILURE': {
        draft.loading = false;
        draft.created = false;
        break;
      }
      default:
    }
  });
}
